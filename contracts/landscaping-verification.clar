;; Landscaping Company Verification Contract
;; This contract validates landscaping service providers

(define-data-var admin principal tx-sender)

;; Map to store verified landscaping companies
(define-map verified-companies principal
  {
    company-name: (string-utf8 100),
    license-number: (string-utf8 50),
    verified-at: uint,
    active: bool
  }
)

;; Public function to verify a landscaping company
(define-public (verify-company (company principal) (company-name (string-utf8 100)) (license-number (string-utf8 50)))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u1)) ;; Only admin can verify
    (asserts! (not (is-some (map-get? verified-companies company))) (err u2)) ;; Company not already verified

    (map-set verified-companies company
      {
        company-name: company-name,
        license-number: license-number,
        verified-at: block-height,
        active: true
      }
    )
    (ok true)
  )
)

;; Public function to check if a company is verified
(define-read-only (is-verified (company principal))
  (match (map-get? verified-companies company)
    company-data (and (get active company-data) true)
    false
  )
)

;; Public function to revoke verification
(define-public (revoke-verification (company principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u1)) ;; Only admin can revoke
    (asserts! (is-some (map-get? verified-companies company)) (err u3)) ;; Company must exist

    (map-set verified-companies company
      (merge (unwrap-panic (map-get? verified-companies company))
        { active: false }
      )
    )
    (ok true)
  )
)

;; Public function to get company details
(define-read-only (get-company-details (company principal))
  (map-get? verified-companies company)
)

;; Public function to transfer admin rights
(define-public (set-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get admin)) (err u1)) ;; Only current admin can transfer
    (var-set admin new-admin)
    (ok true)
  )
)
