import YearSpan from './YearSpan'

export default function Footer() {
  return (
    <footer className="footer" data-dark>
      <div className="wrap">
        <span className="bod" style={{ fontStyle: 'italic' }}>&copy; <YearSpan /> Ian Andujar</span>
        <a className="lab" href="#top">Back to top</a>
      </div>
    </footer>
  )
}
