import './App.css'
import WaveBanner from './components/WaveBanner';

const projects = [
  {
    title: 'Interfaz web editorial',
    text: 'Espacio reservado para presentar un proyecto con foco en estructura visual, jerarquía tipográfica y experiencia responsiva.',
    image: '/banner1.png',
  },
  {
    title: 'Aplicación digital',
    text: 'Espacio reservado para documentar una solución web funcional, desde el planteamiento del problema hasta la implementación.',
    image: '/banner2.png',
  },
]

const skills = ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Bootstrap', 'Node.js', 'MySQL', 'Git', 'APIs']

function App() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const contactUser = ['jesus', 'cop11'].join('.')
    const contactDomain = ['gmail', 'com'].join('.')
    const target = `${contactUser}@${contactDomain}`
    const subject = encodeURIComponent(`Portfolio - ${form.get('name')}`)
    const body = encodeURIComponent(
      `Nombre: ${form.get('name')}\nCorreo: ${form.get('email')}\n\n${form.get('message')}`,
    )

    window.location.href = `mailto:${target}?subject=${subject}&body=${body}`
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#inicio">
          Jesús Gámez | Web Developer
        </a>
        <nav aria-label="Navegación principal">
          <a href="#acerca">Acerca de</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-label="Presentación">
          <img src="/banner3.png" alt="" />
            <WaveBanner />
          <div className="hero-overlay">
            <img src="/foto-perfil.png" alt="" />
            <h2>Web Developer</h2>
            <p>Mis personas favoritas me dicen Chai, soy Web Developer enfocado en crear interfaces modernas, claras y responsivas. Trabajo con una mirada práctica: transformar ideas en soluciones digitales funcionales, atractivas y fáciles de usar.</p>
            <ul className="hero-keywords" aria-label="Enfoques principales">
              <li>Diseño</li>
              <li>Calidad</li>
              <li>Resultados</li>
            </ul>
          </div>
        </section>
        <div className="content">
          <section className="intro-section" id="acerca">
            <h2>La estrategia que impulsa el <span>crecimiento</span></h2>
            <div className="intro-copy">
              <p>
                Me interesa combinar desarrollo frontend, diseño visual y experiencia de usuario para construir sitios
                que comuniquen bien y funcionen con precisión.
              </p>
              <img src="./public/front.png" alt="front" />
            </div>
          </section>

          <section className="visual-feature" aria-label="Enfoque profesional">
            <div>
              <span>Especialidad</span>
              <h2>Diseño web con intención, estructura y detalle.</h2>
            </div>
            <img src="./public/front.png" alt="" />
          </section>

          <section className="skills-section" aria-label="Tecnologías">
            <h2>Herramientas</h2>
            <ul>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </section>

          <section className="projects-section" id="proyectos">
            <div className="section-title">
              <span>Proyectos</span>
              <h2>Casos para construir y documentar</h2>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article className={`project-row ${index % 2 === 1 ? 'reverse' : ''}`} key={project.title}>
                  <div className="project-text">
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                    <button type="button">Próximamente</button>
                  </div>
                  <div className="project-image">
                    <img src={project.image} alt="" />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="contact-section" id="contacto">
            <div className="contact-heading">
              <h2>Potenciar tu proyecto ahora</h2>
              <p>Completa el formulario y conversemos sobre una solución digital clara y bien construida.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-grid">
                <label>
                  Nombre
                  <input name="name" type="text" required />
                </label>
                <label>
                  Correo
                  <input name="email" type="email" required />
                </label>
              </div>
              <label>
                Mensaje
                <textarea name="message" rows="5" required />
              </label>
              <button type="submit">Enviar</button>
            </form>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p>Jesús Gámez | Web Developer</p>
        <div>
          <a href="https://github.com/ChaiGmzR" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/jesus-a-gamez" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
