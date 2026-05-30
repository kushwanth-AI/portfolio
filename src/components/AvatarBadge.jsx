/**
 * AvatarBadge
 * Reusable circular avatar badge with initials, gradient background, glow ring,
 * and glassmorphism styling. Used for portfolio branding and testimonial-style profile chips.
 *
 * Props:
 *  - initials: string (required)  e.g. "KY"
 *  - size:     number  (optional) pixel size of the badge. Default 48.
 *  - variant:  string  (optional) 'primary' | 'mint'. Default 'primary'.
 *      'primary' -> cyan-to-blue gradient with white initials (brand badge)
 *      'mint'    -> cyan-to-mint gradient with dark initials (testimonial style)
 *  - className: string (optional) extra classes
 *  - title:    string  (optional) accessible label override
 */
function AvatarBadge({
  initials,
  size = 48,
  variant = 'primary',
  className = '',
  title,
}) {
  const safeInitials = (initials || '').toString().trim().slice(0, 3).toUpperCase()
  const label = title || `Avatar ${safeInitials}`

  // Scale typography with size so the same component looks balanced at any dimension.
  const fontSize = Math.max(11, Math.round(size * 0.36))

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${fontSize}px`,
  }

  return (
    <span
      className={`avatar-badge avatar-badge--${variant} ${className}`.trim()}
      style={style}
      role="img"
      aria-label={label}
    >
      <span className="avatar-badge__text">{safeInitials}</span>
    </span>
  )
}

export default AvatarBadge
