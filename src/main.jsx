import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CONTACT_URL = 'https://viajar.embonitoms.com.br/r/site-bonistar?utm_source=lp_bonistar_v2&utm_medium=whatsapp&utm_campaign=planeje_bonito';
const contactUrl = (content) => `${CONTACT_URL}&utm_content=${content}`;
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const heroSlides = [
  { src: '/images/hero/barco-cristalino.jpg', alt: 'Viajante em um barco sobre as águas transparentes de Bonito', position: 'center 55%', mobile: '58% center', width: 1080, height: 1350 },
  { src: '/images/hero/flutuacao-aerea.jpg', alt: 'Grupo flutuando em um rio azul visto do alto', position: 'center 46%', mobile: '55% center', width: 1920, height: 2400 },
  { src: '/images/hero/contemplacao-rio.jpg', alt: 'Viajante contemplando o rio em meio à natureza', position: 'center 48%', mobile: '62% center', width: 1920, height: 1333 },
  { src: '/images/hero/cardume-cristalino.jpg', alt: 'Cardume em águas cristalinas de Bonito', position: 'center 52%', mobile: '46% center', width: 1920, height: 1440 },
  { src: '/images/hero/cachoeira-viajante.jpg', alt: 'Viajante junto a uma cachoeira cercada pela mata', position: 'center 48%', mobile: '52% center', width: 1920, height: 1280 },
];

const livedExperiences = [
  { title: 'Flutuação', text: 'Águas cristalinas, cardumes e uma das experiências mais marcantes de Bonito.', image: '/images/experiencias/flutuacao-grupo.jpg', alt: 'Grupo vivendo uma flutuação em águas transparentes', cta: 'Quero viver essa experiência', content: 'viva-isso-flutuacao', position: 'center 42%' },
  { title: 'A dois', text: 'Tempo para contemplar, descobrir e guardar novas memórias juntos.', image: '/images/gallery/casal-deck.jpg', alt: 'Casal contemplando um rio cristalino em Bonito', cta: 'Planejar nossa viagem', content: 'viva-isso-casal', position: '88% center' },
  { title: 'Aventura', text: 'Experiências para sentir Bonito por outros caminhos e com mais adrenalina.', image: '/images/story/aventura-circuito.jpg', alt: 'Viajante em um circuito de aventura junto ao rio', cta: 'Quero incluir no roteiro', content: 'viva-isso-aventura', position: '12% center' },
  { title: 'Cachoeiras', text: 'Trilhas, mata e quedas d’água para entrar na paisagem de verdade.', image: '/images/story/piscina-natural.jpg', alt: 'Viajante diante de uma piscina natural entre paredões', cta: 'Quero incluir no roteiro', content: 'viva-isso-cachoeiras', position: 'center 54%' },
  { title: 'Grutas', text: 'Silêncio, rocha e tons de azul em alguns dos cenários mais impressionantes de Bonito.', image: '/images/experiences/gruta-lago-azul.jpg', alt: 'Visitante contemplando o azul de uma gruta de Bonito', cta: 'Quero conhecer', content: 'viva-isso-grutas', position: 'center 46%' },
  { title: 'Vida sob a água', text: 'Uma perspectiva completamente diferente, entre peixes e águas transparentes.', image: '/images/story/mergulho-solo.jpg', alt: 'Pessoa mergulhando entre peixes em água transparente', cta: 'Quero viver essa experiência', content: 'viva-isso-mergulho', position: 'center 48%' },
];

const experienceList = [
  ['Flutuações', 'Águas transparentes e uma perspectiva completamente diferente de Bonito.', '/images/experiences/flutuacao-grupo.jpg', 'Pessoa praticando flutuação em águas cristalinas', 'flutuacao'],
  ['Grutas', 'Formações naturais, silêncio e cenários que parecem de outro mundo.', '/images/experiencias/gruta-lago-azul.jpg', 'Interior da Gruta do Lago Azul em Bonito', 'grutas'],
  ['Cachoeiras', 'Trilhas pela mata e diferentes quedas d’água ao longo do caminho.', '/images/experiences/cachoeira-caminho.jpg', 'Cachoeira correndo entre pedras e vegetação', 'cachoeiras'],
  ['Balneários', 'Dias leves perto da água para aproveitar Bonito sem pressa.', '/images/experiencias/rio-cristalino.jpg', 'Rio azul cercado pela vegetação de Bonito', 'balnearios'],
  ['Aventuras', 'Outras formas de explorar a natureza e colocar mais movimento no roteiro.', '/images/gallery/trilha-aventura.jpg', 'Veículo percorrendo uma trilha em meio à natureza', 'aventura'],
  ['Mergulhos', 'Encontros com a vida submersa em águas de transparência surpreendente.', '/images/gallery/cardume.jpg', 'Cardume sob as águas transparentes de Bonito', 'mergulhos'],
];

const galleryImages = [
  { src: '/images/gallery/cardume.jpg', alt: 'Cardume colorido sob a água', className: 'gallery__wide', width: 1920, height: 1280 },
  { src: '/images/gallery/trilha-aventura.jpg', alt: 'Veículo percorrendo uma trilha de natureza', className: 'gallery__landscape', width: 1920, height: 1079 },
  { src: '/images/story/piscina-natural.jpg', alt: 'Viajante contemplando uma piscina natural azul', className: 'gallery__tall', width: 1440, height: 1920 },
  { src: '/images/gallery/casal-deck.jpg', alt: 'Casal em um deck junto ao rio', className: 'gallery__portrait', width: 1920, height: 1280 },
  { src: '/images/gallery/cachoeira-floresta.jpg', alt: 'Cachoeira em camadas dentro da floresta', className: 'gallery__landscape', width: 1920, height: 1280 },
  { src: '/images/gallery/deck-cristalino.jpg', alt: 'Viajante em um deck sobre uma nascente transparente', className: 'gallery__portrait', width: 1920, height: 1082 },
  { src: '/images/gallery/cachoeira-intima.jpg', alt: 'Pequena cachoeira em um recanto de mata', className: 'gallery__tall', width: 1092, height: 2304 },
  { src: '/images/story/grupo-flutuacao.jpg', alt: 'Grupo flutuando em águas cristalinas de Bonito', className: 'gallery__wide', width: 1440, height: 1800 },
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.4a8.4 8.4 0 1 1 15.7-4.3Z"/><path d="M8 7.8c.3-.4.5-.4.8-.4h.4c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.6.8c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2 2.1.2.1.4.2.6 0l.9-1.1c.2-.2.4-.2.6-.1l2 .9c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.5.5-1.3.8-2.2.6-1.1-.2-2.5-.7-4.3-2.3-2-1.8-2.8-3.7-3-4.8-.2-.7 0-1.2.3-1.5Z"/></svg>;
}

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand--light' : ''}`} href="#inicio" aria-label="Bonistar Viagens — início">
    <img src={assetUrl('/images/brand/logo-bonistar.png')} alt="Bonistar Viagens" width="409" height="445" />
  </a>;
}

function Header() {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);
  return <header className="site-header">
    <div className="header-inner">
      <Brand light />
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="main-nav" aria-label="Abrir menu"><span /><span /></button>
      <nav id="main-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Navegação principal">
        <a href="#descubra" onClick={() => setOpen(false)}>Descubra</a>
        <a href="#experiencias" onClick={() => setOpen(false)}>Experiências</a>
        <a href="#galeria" onClick={() => setOpen(false)}>Galeria</a>
        <a href="#por-que-nos" onClick={() => setOpen(false)}>Por que nós</a>
      </nav>
      <a className="header-cta" href={contactUrl('header')}>Planejar viagem <ArrowIcon /></a>
    </div>
  </header>;
}

function HeroCarousel() {
  const [active, setActive] = React.useState(0);
  const touchStart = React.useRef(null);

  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const finishSwipe = (clientX) => {
    if (touchStart.current === null) return;
    const distance = clientX - touchStart.current;
    if (Math.abs(distance) > 45) setActive((current) => (current + (distance < 0 ? 1 : heroSlides.length - 1)) % heroSlides.length);
    touchStart.current = null;
  };

  return <div className="hero__carousel" aria-roledescription="carrossel" aria-label="Paisagens e experiências de Bonito" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => finishSwipe(event.changedTouches[0].clientX)}>
    {heroSlides.map((slide, index) => <img
      className={index === active ? 'hero__slide is-active' : 'hero__slide'}
      src={assetUrl(slide.src)}
      srcSet={`${assetUrl(slide.src.replace('.jpg', '-960.jpg'))} 960w, ${assetUrl(slide.src)} 1920w`}
      sizes="100vw"
      alt={index === active ? slide.alt : ''}
      aria-hidden={index !== active}
      width={slide.width}
      height={slide.height}
      fetchPriority={index === 0 ? 'high' : 'auto'}
      loading={index === 0 ? 'eager' : 'lazy'}
      style={{ '--desktop-position': slide.position, '--mobile-position': slide.mobile }}
      key={slide.src}
    />)}
    <div className="hero__dots" role="group" aria-label="Escolher imagem do Hero">
      {heroSlides.map((slide, index) => <button className={index === active ? 'is-active' : ''} onClick={() => setActive(index)} aria-label={`Mostrar imagem ${index + 1} de ${heroSlides.length}`} aria-current={index === active ? 'true' : undefined} key={slide.src}><span /></button>)}
    </div>
  </div>;
}

function ExperienceCarousel() {
  const track = React.useRef(null);
  const [canBack, setCanBack] = React.useState(false);
  const [canForward, setCanForward] = React.useState(true);

  const updateControls = React.useCallback(() => {
    const element = track.current;
    if (!element) return;
    setCanBack(element.scrollLeft > 8);
    setCanForward(element.scrollLeft < element.scrollWidth - element.clientWidth - 8);
  }, []);

  React.useEffect(() => {
    updateControls();
    window.addEventListener('resize', updateControls);
    return () => window.removeEventListener('resize', updateControls);
  }, [updateControls]);

  const move = (direction) => {
    const element = track.current;
    if (!element) return;
    const card = element.querySelector('.live-card');
    element.scrollBy({ left: direction * ((card?.getBoundingClientRect().width || 360) + 18), behavior: 'smooth' });
  };

  return <section className="live section" id="viva-isso" aria-labelledby="live-title">
    <div className="shell live__head reveal">
      <div><p className="eyebrow">Experiências para guardar</p><h2 id="live-title">Viva isso com<br/><em>a Bonistar!</em></h2></div>
      <div className="live__guidance"><p>Role para o lado e descubra o que pode entrar na sua viagem.</p><div className="live__controls"><button type="button" onClick={() => move(-1)} disabled={!canBack} aria-label="Ver experiências anteriores">←</button><button type="button" onClick={() => move(1)} disabled={!canForward} aria-label="Ver próximas experiências">→</button></div></div>
    </div>
    <div className="live__track" ref={track} onScroll={updateControls} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }} tabIndex="0" aria-label="Experiências em Bonito. Use as setas do teclado para navegar.">
      {livedExperiences.map((item) => <article className="live-card" key={item.title}>
        <img src={assetUrl(item.image)} alt={item.alt} width="1440" height="1800" loading="lazy" style={{ objectPosition: item.position }} />
        <div className="live-card__veil" />
        <div className="live-card__content"><p>{item.title}</p><h3>{item.text}</h3><a href={contactUrl(item.content)}>{item.cta} <ArrowIcon /></a></div>
      </article>)}
    </div>
  </section>;
}

function App() {
  React.useEffect(() => {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <Header />
    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <HeroCarousel />
        <div className="hero__veil" />
        <div className="hero__content shell">
          <p className="eyebrow eyebrow--light">Bonito · Mato Grosso do Sul</p>
          <h1 id="hero-title">Há lugares que você visita.<br/><em>Bonito você vive.</em></h1>
          <p className="hero__lead">Águas que parecem não ter fim. Natureza por todos os lados. E uma viagem desenhada para o seu jeito de descobrir.</p>
          <a className="button button--coral" href={contactUrl('hero')}>Quero planejar essa viagem <ArrowIcon /></a>
        </div>
        <a className="scroll-cue" href="#descubra"><span>Descubra Bonito</span><i /></a>
      </section>

      <section className="intro section" id="descubra">
        <div className="shell intro__grid">
          <div className="intro__copy reveal"><p className="eyebrow">Um destino fora do comum</p><h2>A natureza faz tudo<br/>parecer mais <em>vivo.</em></h2></div>
          <div className="intro__text reveal"><p>Em Bonito, cada dia pode começar de um jeito diferente: flutuando em rios transparentes, atravessando trilhas, encontrando cachoeiras ou descobrindo o azul de uma gruta.</p><p>Não é sobre correr para ver tudo. É sobre escolher o que combina com você — e viver cada experiência por inteiro.</p></div>
        </div>
        <div className="intro__visual shell reveal">
          <figure className="photo photo--a"><img src={assetUrl('/images/story/rio-aereo.jpg')} alt="Rio sinuoso atravessando a vegetação visto do alto" width="1920" height="1080" loading="lazy" /></figure>
          <figure className="photo photo--b"><img src={assetUrl('/images/story/mergulho-solo.jpg')} alt="Pessoa mergulhando em água transparente" width="1920" height="1440" loading="lazy" /></figure>
          <p className="visual-note"><span>01</span> A transparência que<br/>faz Bonito ser Bonito.</p>
        </div>
      </section>

      <ExperienceCarousel />

      <section className="experiences section" id="experiencias">
        <div className="shell">
          <div className="section-head reveal"><p className="eyebrow">Escolha como viver Bonito</p><h2>Experiências para<br/><em>o seu roteiro.</em></h2><p>Entre a calmaria e a aventura, nossa equipe ajuda a combinar as possibilidades com o seu ritmo, sua companhia e seus dias em Bonito.</p></div>
          <div className="experience-list">
            {experienceList.map(([title, description, image, alt, content], index) => <article className="experience reveal" key={title}><span className="experience__number">0{index + 1}</span><div className="experience__image"><img src={assetUrl(image)} alt={alt} width="1920" height="1280" loading="lazy" /></div><div className="experience__copy"><h3>{title}</h3><p>{description}</p><a className="experience__link" href={contactUrl(content)}>Quero incluir no meu roteiro <ArrowIcon /></a></div></article>)}
          </div>
        </div>
      </section>

      <section className="immersive" aria-label="Experiência visual de Bonito">
        <img src={assetUrl('/images/story/rio-final.jpg')} alt="Rio azul atravessando a mata de Bonito" width="1920" height="1080" loading="lazy" />
        <div className="immersive__overlay shell reveal"><p>Você entra pela paisagem.</p><h2>E sai levando<br/><em>uma nova memória.</em></h2></div>
      </section>

      <section className="curation section" id="por-que-nos">
        <div className="shell curation__grid">
          <div className="curation__photo reveal"><img src={assetUrl('/images/gallery/deck-cristalino.jpg')} alt="Viajante observando uma nascente cristalina de um deck" width="1920" height="1082" loading="lazy" /><span>Bonito começa antes da chegada.</span></div>
          <div className="curation__copy reveal">
            <p className="eyebrow">Viaje com a Em Bonito MS</p><h2>Menos pesquisa.<br/><em>Mais viagem.</em></h2>
            <p>Bonito tem muitas possibilidades — e combinar passeios, horários e deslocamentos faz diferença no que você consegue viver. Nossa equipe conhece o destino e transforma suas ideias em um roteiro que faça sentido.</p>
            <ul className="check-list"><li><span>01</span><div><strong>Especialistas locais</strong><small>Curadoria de quem vive o destino.</small></div></li><li><span>02</span><div><strong>Roteiro personalizado</strong><small>Escolhas que combinam com seu perfil e seu tempo.</small></div></li><li><span>03</span><div><strong>Atendimento humano</strong><small>Suporte antes e durante a viagem.</small></div></li><li><span>04</span><div><strong>Organização completa</strong><small>Passeios, hospedagem e transporte no mesmo planejamento.</small></div></li></ul>
            <a className="text-link" href={contactUrl('bonistar')}>Montar meu roteiro com a Bonistar <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="possibilities section">
        <div className="shell">
          <div className="possibilities__top reveal"><p className="eyebrow">Possibilidades para o seu roteiro</p><h2>Seu dia pode ir<br/><em>da calmaria à aventura.</em></h2><p>A melhor combinação depende do seu ritmo, companhia e tempo em Bonito.</p></div>
          <div className="possibilities__visual reveal"><img src={assetUrl('/images/story/rio-vertical.jpg')} alt="Rio azul e vegetação vistos verticalmente do alto" width="1920" height="2400" loading="lazy" /><div className="possibilities__labels" aria-label="Tipos de passeios"><span>Flutuações</span><span>Cachoeiras</span><span>Grutas</span><span>Balneários</span><span>Aventuras</span><span>Mergulhos</span></div></div>
        </div>
      </section>

      <section className="gallery section" id="galeria">
        <div className="shell gallery__heading reveal"><p className="eyebrow">Um destino, muitos cenários</p><h2>Bonito se revela<br/><em>a cada novo olhar.</em></h2><p>Da superfície ao fundo dos rios, cada passeio muda a perspectiva.</p></div>
        <div className="shell gallery__grid">
          {galleryImages.map((image, index) => <figure className={`${image.className} reveal`} key={image.src}><img src={assetUrl(image.src)} alt={image.alt} width={image.width} height={image.height} loading="lazy" /><figcaption>0{index + 1}</figcaption></figure>)}
        </div>
      </section>

      <section className="testimonials section" id="depoimentos">
        <div className="shell testimonials__scene reveal"><img src={assetUrl('/images/story/balneario-calmo.jpg')} alt="Balneário tranquilo cercado pela mata" width="1920" height="1280" loading="lazy" /><span>Experiências que ficam</span></div>
        <div className="shell">
          <div className="testimonials__head reveal"><p className="eyebrow eyebrow--light">Histórias de quem já viveu</p><h2>Bonito fica na memória.<br/><em>O cuidado também.</em></h2><div className="rating" aria-label="Avaliação 4,9 no Google"><strong>4,9</strong><span>★★★★★<small>no Google</small></span></div></div>
          <div className="quotes"><blockquote className="reveal"><p>“A gente foi na lua de mel e eu tava perdida com tanta opção. A Bonistar organizou tudo e no fim foi só chegar e aproveitar.”</p><footer><strong>Mariana Costa</strong><span>São Paulo · SP</span></footer></blockquote><blockquote className="reveal"><p>“Precisei mudar um passeio já perto da viagem e achei que ia dar dor de cabeça, mas resolveram rápido pelo WhatsApp.”</p><footer><strong>Juliana Ferreira</strong><span>Belo Horizonte · MG</span></footer></blockquote><blockquote className="reveal"><p>“Fomos com as crianças e deu super certo. O roteiro não ficou corrido e ainda pegaram passeios que elas curtiram bastante.”</p><footer><strong>Pedro Santana</strong><span>Rio de Janeiro · RJ</span></footer></blockquote></div>
        </div>
      </section>

      <section className="personal section">
        <div className="shell personal__grid">
          <div className="personal__copy reveal"><p className="eyebrow">A sua viagem, não qualquer viagem</p><h2>Bonito muda<br/><em>com quem vive.</em></h2><p>Uma viagem a dois pede um ritmo. Com crianças, outro. Há quem queira aventura desde cedo e quem prefira dias leves perto da água.</p><p>Conte como você imagina seus dias. A Em Bonito MS ajuda a encontrar o equilíbrio certo.</p></div>
          <figure className="personal__photo reveal"><img src={assetUrl('/images/story/encontro-com-peixes.jpg')} alt="Viajantes observando peixes em um rio transparente" width="1080" height="1920" loading="lazy" /><figcaption>Uma viagem com a sua medida.</figcaption></figure>
          <div className="personal__profiles reveal"><span>Casal</span><span>Família</span><span>Aventura</span><span>Descanso</span><span>Primeira viagem</span><span>Poucos dias</span></div>
        </div>
      </section>

      <section className="plan section" id="planeje">
        <div className="shell plan__grid">
          <div className="plan__heading reveal"><p className="eyebrow">Planeje e reserve sua viagem</p><h2>Da vontade de ir<br/>ao roteiro <em>pronto.</em></h2><img src={assetUrl('/images/experiences/flutuacao-grupo.jpg')} alt="Pessoa vivendo uma experiência de flutuação" width="1920" height="1440" loading="lazy" /></div>
          <ol className="steps reveal"><li><span>1</span><div><strong>Você conta sobre a viagem</strong><p>Datas, companhia, ritmo e o que não pode faltar.</p></div></li><li><span>2</span><div><strong>Nossa equipe monta e organiza o roteiro</strong><p>Combinamos passeios, hospedagem e transporte para que as escolhas façam sentido juntas.</p></div></li><li><span>3</span><div><strong>Você reserva e chega para viver Bonito</strong><p>Com a viagem organizada e suporte humano antes e durante a experiência.</p></div></li></ol>
          <div className="plan__action reveal"><p>Da escolha dos passeios à organização da viagem, você fala com uma equipe que conhece o destino.</p><a className="button button--coral" href={contactUrl('planejamento')}><WhatsAppIcon /> Começar meu planejamento</a><small>Atendimento humano, direto pelo WhatsApp.</small></div>
        </div>
      </section>

      <section className="final-cta">
        <img src={assetUrl('/images/story/grupo-flutuacao.jpg')} alt="Grupo flutuando junto em águas cristalinas de Bonito" width="1440" height="1800" loading="lazy" />
        <div className="final-cta__content shell reveal"><p className="eyebrow eyebrow--light">Bonito está esperando</p><h2>Essa pode ser<br/><em>a sua viagem.</em></h2><a className="button button--light" href={contactUrl('cta-final')}>Quero viajar para Bonito <ArrowIcon /></a></div>
      </section>
    </main>

    <footer className="footer">
      <div className="shell footer__top"><Brand light /><p>Sua agência especializada em experiências únicas na capital mundial do ecoturismo.</p><div className="footer__contact"><span>Bonito, Mato Grosso do Sul</span><a href="tel:+5567992643282">(67) 99264-3282</a><a href="mailto:bonistar@bonistar.com.br">bonistar@bonistar.com.br</a></div><nav aria-label="Links do rodapé"><a href="#descubra">O destino</a><a href="#experiencias">Experiências</a><a href="#por-que-nos">Por que nós</a><a href="https://www.embonitoms.com.br/politica-de-compra">Política de compra</a></nav></div>
      <div className="shell footer__bottom"><span>© 2026 Bonistar Viagens. Todos os direitos reservados.</span><div><a href="https://www.instagram.com/bonistarviagens" aria-label="Instagram da Bonistar">Instagram</a><a href="https://www.facebook.com/bonistarviagens/" aria-label="Facebook da Bonistar">Facebook</a></div></div>
    </footer>
    <a className="floating-whatsapp" href={contactUrl('floating-whatsapp')} aria-label="Planejar viagem pelo WhatsApp"><WhatsAppIcon /><span>Planejar viagem</span></a>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
