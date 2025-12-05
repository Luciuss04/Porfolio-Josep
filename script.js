function setupAnimations() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  if (!window.gsap || !window.ScrollTrigger) return
  gsap.registerPlugin(ScrollTrigger)
  const startHero = () => {
    if (window.SplitType) {
      const split = new SplitType('.hero .hero-title', { types: 'words, chars' })
      gsap.from(split.chars, {
        yPercent: 120,
        rotate: -8,
        opacity: 0,
        stagger: 0.015,
        ease: 'power2.out',
        duration: 0.4,
        force3D: true
      })
    } else {
      gsap.from('.hero .hero-title', {
        yPercent: 120,
        opacity: 0,
        ease: 'power2.out',
        duration: 0.5,
        force3D: true
      })
    }
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(startHero)
  else startHero()
  gsap.utils.toArray('.section-head').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    })
  })
  gsap.utils.toArray('#skills .bar').forEach((bar) => {
    const fill = bar.querySelector('.bar-fill')
    const lvl = parseFloat(bar.getAttribute('data-level')) || 0
    let label = bar.querySelector('.bar-label')
    if (!label) { label = document.createElement('span'); label.className = 'bar-label'; label.textContent = '0%'; bar.appendChild(label) }
    gsap.fromTo(fill, { width: '0%' }, {
      width: lvl + '%',
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: bar, start: 'top 85%' }
    })
    const obj = { v: 0 }
    gsap.to(obj, {
      v: lvl,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: bar, start: 'top 85%' },
      onUpdate: () => { label.textContent = Math.round(obj.v) + '%' }
    })
  })
  gsap.utils.toArray('#interests .interest-card').forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    })
  })
  gsap.utils.toArray('.card').forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 16,
      scale: 0.995,
      duration: 0.35,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 95%', once: true }
    })
    const img = el.querySelector('.card-media img')
    if (img) {
      el.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.05, duration: 0.25, ease: 'power2.out' })
      })
      el.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.25, ease: 'power2.out' })
      })
    }
  })
  const tl = gsap.timeline({ scrollTrigger: { trigger: '#work', start: 'top top', end: '+=300', pin: '.section-head', scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true } })
  tl.to('#work .grid', { y: -20, ease: 'none' })
}

function setupTilt() {
  if (!window.VanillaTilt) return
  VanillaTilt.init(document.querySelectorAll('.card'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.18
  })
}

let lastY = 0
window.addEventListener('scroll', () => {
  const y = window.scrollY
  const header = document.querySelector('.site-header')
  if (y > lastY && y > 120) header.style.transform = 'translateY(-100%)'
  else header.style.transform = 'translateY(0)'
  lastY = y
})

const cursor = document.querySelector('.cursor')
window.addEventListener('pointermove', (e) => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'
})

document.querySelectorAll('.btn.magnetic').forEach(btn => {
  let raf = 0
  const move = (x, y) => {
    btn.style.transform = `translate(${x}px, ${y}px)`
  }
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width/2) * 0.25
    const y = (e.clientY - r.top - r.height/2) * 0.25
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(() => move(x, y))
  })
  btn.addEventListener('mouseleave', () => move(0, 0))
})

function hero3D() {
  if (!window.THREE) return
  const canvas = document.getElementById('hero-canvas')
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
  camera.position.set(0, 0, 6)
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)

  const gold = new THREE.MeshPhysicalMaterial({ color: 0xd4af37, metalness: 1, roughness: 0.2, clearcoat: 0.7 })
  const purpleLight = new THREE.PointLight(0x3a2083, 8, 50)
  purpleLight.position.set(-5, 3, 7)
  scene.add(purpleLight)
  const warmLight = new THREE.PointLight(0xe2c24f, 6, 50)
  warmLight.position.set(4, -2, 6)
  scene.add(warmLight)

  const geo = new THREE.TorusKnotGeometry(1.2, 0.38, 300, 42)
  const mesh = new THREE.Mesh(geo, gold)
  scene.add(mesh)

  const pGeo = new THREE.BufferGeometry()
  const N = 800
  const positions = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const r = 7.5 * Math.random()
    const a = Math.random() * Math.PI * 2
    const b = (Math.random() - 0.5) * Math.PI
    positions[i*3+0] = r * Math.cos(a) * Math.cos(b)
    positions[i*3+1] = r * Math.sin(b)
    positions[i*3+2] = r * Math.sin(a) * Math.cos(b)
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const pMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.03, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending })
  const points = new THREE.Points(pGeo, pMat)
  scene.add(points)

  let mx = 0, my = 0
  window.addEventListener('pointermove', (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2
    my = (e.clientY / window.innerHeight - 0.5) * 2
  })

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', resize)

  function tick() {
    mesh.rotation.x += 0.004
    mesh.rotation.y += 0.006
    points.rotation.y -= 0.0008
    camera.position.x += (mx * 0.8 - camera.position.x) * 0.03
    camera.position.y += (-my * 0.6 - camera.position.y) * 0.03
    camera.lookAt(0,0,0)
    renderer.render(scene, camera)
    requestAnimationFrame(tick)
  }
  resize()
  requestAnimationFrame(tick)
}

setupTilt()
setupAnimations()

function setupSmoothScroll() {
  if (!window.Lenis) return
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const lenis = new Lenis()
  if (window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update)
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
}
setupSmoothScroll()

// Ripple en botones usando Anime.js
function setupButtonRipple() {
  if (!window.anime) return
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const r = btn.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const rip = document.createElement('span')
      rip.className = 'ripple'
      rip.style.left = x + 'px'
      rip.style.top = y + 'px'
      btn.appendChild(rip)
      anime({ targets: rip, scale: [0, 12], opacity: [0.6, 0], easing: 'easeOutQuad', duration: 600, complete: () => rip.remove() })
    })
  })
}
setupButtonRipple()
