import { useEffect, useRef, useState } from 'react'
import './App.css'
import WaveBanner from './components/WaveBanner';

const projects = [
  {
    title: 'Dental Care Clinic',
    text: 'Landing page para clínica dental, con un diseño moderno y responsivo, que muestra los servicios, el equipo y la ubicación de la clínica.',
    text2:'Se definieron los colores base y la tipografía, se diseñaron los elementos gráficos y se implementó en una estrucutra responsiva para lograr una experiencia óptima en todos los dispositivos.',
    image: '/dental-clinic.png',
    link: 'https://dental-clinic-steel-seven.vercel.app/',
  },
  {
    title: 'BullsGym',
    text: 'Landing page para gimnasio, con un diseño atractivo y funcional, que presenta los servicios, horarios y promociones del gimnasio.',
    text2:'Se diseño un logo funcional a pedido y medida del cliente, se utilizaron colores fuertes con tipografias robustas y con energia haciendo sentido con la marca y su giro.',
    image: '/bulls-gym.png',
    link: 'https://bulls-gym.vercel.app/',
  },
]

const skills = [
  {
    name: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'JavaScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TypeScript',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  },
  {
    name: 'HTML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  },
  {
    name: 'Bootstrap',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
  },
  {
    name: 'Node.js',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  },
  {
    name: 'GitHub',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  },
  
]

function App() {
  const siteHeaderRef = useRef(null)
  const skillsMarqueeRef = useRef(null)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const skillLoop = [...skills, ...skills, ...skills]

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 560) {
        setIsMobileNavOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const header = siteHeaderRef.current
    const hero = document.querySelector('.hero')

    if (!header || !hero) {
      return undefined
    }

    let frameId = 0

    const updateHeaderColor = () => {
      frameId = 0

      const rect = hero.getBoundingClientRect()
      const heroHeight = rect.height || window.innerHeight
      const scrolledHero = Math.min(Math.max(-rect.top, 0), heroHeight)
      const fadeStart = heroHeight * 0.52
      const fadeEnd = heroHeight * 0.96
      const progress = Math.min(Math.max((scrolledHero - fadeStart) / (fadeEnd - fadeStart), 0), 1)
      const channel = Math.round(255 - 238 * progress)

      header.style.setProperty('--header-ink-progress', progress.toFixed(3))
      header.style.setProperty('--header-color', `rgb(${channel} ${channel} ${channel})`)
    }

    const requestUpdate = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(updateHeaderColor)
      }
    }

    updateHeaderColor()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  useEffect(() => {
    const marquee = skillsMarqueeRef.current

    if (!marquee) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let isDragging = false
    let startX = 0
    let startScrollLeft = 0

    const segmentWidth = () => marquee.scrollWidth / 3

    const normalizeScroll = () => {
      const width = segmentWidth()

      if (!width) {
        return
      }

      if (marquee.scrollLeft >= width * 2) {
        marquee.scrollLeft -= width
      } else if (marquee.scrollLeft <= 0) {
        marquee.scrollLeft += width
      }
    }

    marquee.scrollLeft = segmentWidth()

    const tick = () => {
      if (!prefersReducedMotion && !isDragging) {
        marquee.scrollLeft += 0.55
        normalizeScroll()
      }

      animationFrame = window.requestAnimationFrame(tick)
    }

    const handlePointerDown = (event) => {
      event.preventDefault()
      isDragging = true
      startX = event.clientX
      startScrollLeft = marquee.scrollLeft
      marquee.classList.add('is-dragging')
      marquee.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event) => {
      if (!isDragging) {
        return
      }

      marquee.scrollLeft = startScrollLeft - (event.clientX - startX)
      normalizeScroll()
    }

    const stopDragging = (event) => {
      if (!isDragging) {
        return
      }

      isDragging = false
      marquee.classList.remove('is-dragging')

      if (marquee.hasPointerCapture(event.pointerId)) {
        marquee.releasePointerCapture(event.pointerId)
      }
    }

    animationFrame = window.requestAnimationFrame(tick)
    marquee.addEventListener('pointerdown', handlePointerDown)
    marquee.addEventListener('pointermove', handlePointerMove)
    marquee.addEventListener('pointerup', stopDragging)
    marquee.addEventListener('pointercancel', stopDragging)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      marquee.removeEventListener('pointerdown', handlePointerDown)
      marquee.removeEventListener('pointermove', handlePointerMove)
      marquee.removeEventListener('pointerup', stopDragging)
      marquee.removeEventListener('pointercancel', stopDragging)
    }
  }, [])

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
      <header className="site-header" ref={siteHeaderRef}>
        <a className="brand" href="#inicio">
          Jesús Gámez | Web Developer
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="site-navigation"
          aria-expanded={isMobileNavOpen}
          aria-label={isMobileNavOpen ? 'Cerrar navegación' : 'Abrir navegación'}
          onClick={() => setIsMobileNavOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="site-navigation"
          className={isMobileNavOpen ? 'is-open' : ''}
          aria-label="Navegación principal"
        >
          <a href="#acerca" onClick={() => setIsMobileNavOpen(false)}>Acerca de</a>
          <a href="#proyectos" onClick={() => setIsMobileNavOpen(false)}>Proyectos</a>
          <a href="#contacto" onClick={() => setIsMobileNavOpen(false)}>Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-label="Presentación">
          <img src="/banner3.png" alt="" />
            <WaveBanner />
          <div className="hero-overlay">
            <span className="profile-photo" aria-hidden="true">
              <img src="/foto-perfil.png" alt="" />
            </span>
            <h2>Web Developer</h2>
            <p>Hola! Mis personas favoritas me dicen Chai, soy Web Developer enfocado en crear interfaces modernas, claras y responsivas. Trabajo con una mirada práctica: transformar ideas en soluciones digitales funcionales, atractivas y fáciles de usar.</p>
            <ul className="hero-keywords" aria-label="Enfoques principales">
              <li>Diseño</li>
              <li>Calidad</li>
              <li>Alcance</li>
            </ul>
          </div>
        </section>
        <div className="content">
          <section className="intro-section" id="acerca">
              <img src="/mock.png" alt="Interfaz de desarrollo frontend" />
            <h2>La estrategia que impulsará tu <span>crecimiento</span></h2>
          </section>

          <section className="visual-feature" aria-label="Enfoque profesional">
            <div>
              <span>Especialidad</span>
              <h2>Diseño web con intención, estructura y detalle.</h2>
            </div>
            <img src="/front.png" alt="" />
          </section>

          <section className="skills-section" aria-label="Tecnologías">
            <div className="skills-heading">
              <h2>Herramientas</h2>
            </div>

            <div className="skills-marquee" ref={skillsMarqueeRef}>
              <ul className="skills-track">
                {skillLoop.map((skill, index) => (
                  <li key={`${skill.name}-${index}`} aria-hidden={index < skills.length || index >= skills.length * 2}>
                    <img src={skill.logo} alt="" loading="lazy" />
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="projects-section" id="proyectos">
            <div className="section-title">
              <span>Proyectos</span>
            </div>

            <div className="project-list">
              {projects.map((project, index) => (
                <article className={`project-row ${index % 2 === 1 ? 'reverse' : ''}`} key={project.title}>
                  <div className="project-text">
                    <h3>{project.title}</h3>
                    <p>{project.text}</p>
                    <p>{project.text2}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="btn">
                      Ver proyecto
                    </a>
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-image">
                    <img src={project.image} alt="" />
                  </a>
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
                  <input name="name" type="text" placeholder="Tu nombre completo" required />
                </label>
                <label>
                  Correo
                  <input name="email" type="email" placeholder="correo@ejemplo.com" required />
                </label>
              </div>
              <label>
                Mensaje
                <textarea name="message" rows="5" placeholder="Cuéntame sobre tu proyecto" required />
              </label>
              <button type="submit">Enviar</button>
            </form>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <p><a href="#inicio" >
          Jesús Gámez | Web Developer
        </a></p>
        <div>
          <a href="https://github.com/ChaiGmzR" target="_blank" rel="noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="social-icon" />
          </a>
          <a href="https://www.linkedin.com/in/jesus-gmz" target="_blank" rel="noreferrer">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="social-icon" />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
