import CopyEmailButton from './CopyEmailButton'

export default function Contact() {
  return (
    <section id="contact" className="contact moss-bg" data-dark>
      <div className="wrap">
        <h2 className="rv">Let&rsquo;s talk.</h2>
        <div className="contact__card rv">
          <p className="read">I&rsquo;m looking for internships in mechanical engineering, robotics and aerospace. If you have one, want to talk about a project, or want to argue about anything on this page, send me an email.</p>
          <div className="actions">
            <CopyEmailButton email="ianmarcoandujar9@gmail.com" />
            <a className="btn btn--ghost" href="https://www.linkedin.com/in/ian-andujar-710a6a388" target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <div className="contact__links">
            <a className="u-link u-link--big" href="mailto:ianmarcoandujar9@gmail.com">ianmarcoandujar9@gmail.com</a>
            <a className="u-link u-link--sm" href="tel:+18622471465">862-247-1465</a>
          </div>
        </div>
      </div>
    </section>
  )
}
