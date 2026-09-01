import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CONTACT_URL = 'https://viajar.embonitoms.com.br/r/site-bonistar?utm_source=lp_bonistar_v2&utm_medium=whatsapp&utm_campaign=planeje_bonito&utm_content=cta';

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.4a8.4 8.4 0 1 1 15.7-4.3Z"/><path d="M8 7.8c.3-.4.5-.4.8-.4h.4c.2 0 .4.1.5.4l.8 1.8c.1.3 0 .5-.1.7l-.6.8c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2 2.1.2.1.4.2.6 0l.9-1.1c.2-.2.4-.2.6-.1l2 .9c.3.1.4.3.4.5 0 .3-.2 1.3-.8 1.8-.5.5-1.3.8-2.2.6-1.1-.2-2.5-.7-4.3-2.3-2-1.8-2.8-3.7-3-4.8-.2-.7 0-1.2.3-1.5Z"/></svg>;
}

function Brand({ light = false }) {
  return <a className={`brand ${light ? 'brand--light' : ''}`} href="#inicio" aria-label="Em Bonito MS — início">
    <span className="brand__mark" aria-hidden="true"><i /><i /></span>
    <span><strong>Em Bonito MS</strong><small>por Bonistar Viagens</small></span>
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
        <a href="#por-que-nos" onClick={() => setOpen(false)}>Por que nós</a>
        <a href="#depoimentos" onClick={() => setOpen(false)}>Depoimentos</a>
      </nav>
      <a className="header-cta" href={CONTACT_URL}>Planejar viagem <ArrowIcon /></a>
    </div>
  </header>;
}

const experienceList = [
  ['Flutuação', 'A água revela um mundo inteiro sob a superfície.', '/images/experiencias/flutuacao-grupo.jpg'],
  ['Grutas', 'Silêncio, rocha e tons de azul que parecem irreais.', '/images/experiencias/gruta-lago-azul.jpg'],
  ['Cachoeiras', 'Caminhos de mata que terminam dentro d’água.', '/images/experiencias/cachoeira.jpg'],
  ['Contemplação', 'Tempo para respirar e olhar Bonito sem pressa.', '/images/experiencias/rio-cristalino.jpg'],
];

function App() {
  React.useEffect(() => {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <>
    <Header />
    <main>
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <img className="hero__image" src="/images/hero/bonito-aguas-cristalinas.jpg" alt="Rio de águas cristalinas cercado pela vegetação de Bonito, Mato Grosso do Sul" width="1080" height="1350" fetchPriority="high" />
        <div className="hero__veil" />
        <div className="hero__content shell">
          <p className="eyebrow eyebrow--light">Bonito · Mato Grosso do Sul</p>
          <h1 id="hero-title">Há lugares que você visita.<br/><em>Bonito você vive.</em></h1>
          <p className="hero__lead">Águas que parecem não ter fim. Natureza por todos os lados. E uma viagem desenhada para o seu jeito de descobrir.</p>
          <a className="button button--coral" href={CONTACT_URL}>Quero planejar essa viagem <ArrowIcon /></a>
        </div>
        <a className="scroll-cue" href="#descubra"><span>Descubra Bonito</span><i /></a>
      </section>

      <section className="intro section" id="descubra">
        <div className="shell intro__grid">
          <div className="intro__copy reveal">
            <p className="eyebrow">Um destino fora do comum</p>
            <h2>A natureza faz tudo<br/>parecer mais <em>vivo.</em></h2>
          </div>
          <div className="intro__text reveal">
            <p>Em Bonito, cada dia pode começar de um jeito diferente: flutuando em rios transparentes, atravessando trilhas, encontrando cachoeiras ou descobrindo o azul de uma gruta.</p>
            <p>Não é sobre correr para ver tudo. É sobre escolher o que combina com você — e viver cada experiência por inteiro.</p>
          </div>
        </div>
        <div className="intro__visual shell reveal">
          <figure className="photo photo--a"><img src="/images/destino/nascente-aerea.jpg" alt="Vista aérea de uma nascente azul cercada pela mata" width="1012" height="1800" loading="lazy" /></figure>
          <figure className="photo photo--b"><img src="/images/destino/peixes-submersos.jpg" alt="Peixes nadando nas águas transparentes de Bonito" width="675" height="1200" loading="lazy" /></figure>
          <p className="visual-note"><span>01</span> A transparência que<br/>faz Bonito ser Bonito.</p>
        </div>
      </section>

      <section className="experiences section" id="experiencias">
        <div className="shell">
          <div className="section-head reveal">
            <p className="eyebrow">Do seu jeito</p>
            <h2>Uma viagem.<br/><em>Muitas formas de sentir.</em></h2>
            <p>Entre a calmaria e a aventura, existe um Bonito para cada momento.</p>
          </div>
          <div className="experience-list">
            {experienceList.map(([title, description, image], index) => <article className="experience reveal" key={title}>
              <span className="experience__number">0{index + 1}</span>
              <div className="experience__image"><img src={image} alt={`${title} em Bonito, Mato Grosso do Sul`} width="900" height="1200" loading="lazy" /></div>
              <div className="experience__copy"><h3>{title}</h3><p>{description}</p></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="immersive" aria-label="Experiência visual de Bonito">
        <img src="/images/destino/banho-cristalino.jpg" alt="Viajante contemplando uma piscina natural de águas cristalinas em Bonito" width="1080" height="1440" loading="lazy" />
        <div className="immersive__overlay shell reveal">
          <p>Você entra pela paisagem.</p>
          <h2>E sai levando<br/><em>uma nova memória.</em></h2>
        </div>
      </section>

      <section className="curation section" id="por-que-nos">
        <div className="shell curation__grid">
          <div className="curation__photo reveal"><img src="/images/experiencias/barco-rio.jpg" alt="Viajante em barco sobre rio transparente em Bonito" width="1080" height="1350" loading="lazy" /><span>Bonito começa antes da chegada.</span></div>
          <div className="curation__copy reveal">
            <p className="eyebrow">Viaje com a Em Bonito MS</p>
            <h2>Menos pesquisa.<br/><em>Mais viagem.</em></h2>
            <p>Bonito tem muitas possibilidades — e combinar passeios, horários e deslocamentos faz diferença no que você consegue viver. Nossa equipe conhece o destino e ajuda a transformar suas ideias em um roteiro que faça sentido.</p>
            <ul className="check-list">
              <li><span>01</span><div><strong>Especialistas locais</strong><small>Curadoria de quem vive o destino.</small></div></li>
              <li><span>02</span><div><strong>Roteiro personalizado</strong><small>Escolhas que combinam com seu perfil e seu tempo.</small></div></li>
              <li><span>03</span><div><strong>Atendimento humano</strong><small>Suporte antes e durante a viagem.</small></div></li>
              <li><span>04</span><div><strong>Organização completa</strong><small>Passeios, hospedagem e transporte no mesmo planejamento.</small></div></li>
            </ul>
            <a className="text-link" href={CONTACT_URL}>Conversar com um especialista <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="possibilities section">
        <div className="shell">
          <div className="possibilities__top reveal">
            <p className="eyebrow">Possibilidades para o seu roteiro</p>
            <h2>Seu dia pode ir<br/><em>da calmaria à aventura.</em></h2>
            <p>Estas são algumas experiências que podem fazer parte da sua viagem. A melhor combinação depende do seu ritmo, companhia e tempo em Bonito.</p>
          </div>
          <div className="possibilities__visual reveal">
            <img src="/images/experiencias/flutuacao-peixes.jpg" alt="Flutuação entre peixes em água transparente" width="675" height="1200" loading="lazy" />
            <div className="possibilities__labels" aria-label="Tipos de passeios"><span>Flutuações</span><span>Cachoeiras</span><span>Grutas</span><span>Balneários</span><span>Aventuras</span><span>Mergulhos</span></div>
          </div>
        </div>
      </section>

      <section className="testimonials section" id="depoimentos">
        <div className="shell">
          <div className="testimonials__head reveal">
            <p className="eyebrow eyebrow--light">Histórias de quem já viveu</p>
            <h2>Bonito fica na memória.<br/><em>O cuidado também.</em></h2>
            <div className="rating" aria-label="Avaliação 4,9 no Google"><strong>4,9</strong><span>★★★★★<small>no Google</small></span></div>
          </div>
          <div className="quotes">
            <blockquote className="reveal"><p>“A gente foi na lua de mel e eu tava perdida com tanta opção. A Bonistar organizou tudo e no fim foi só chegar e aproveitar.”</p><footer><strong>Mariana Costa</strong><span>São Paulo · SP</span></footer></blockquote>
            <blockquote className="reveal"><p>“Precisei mudar um passeio já perto da viagem e achei que ia dar dor de cabeça, mas resolveram rápido pelo WhatsApp.”</p><footer><strong>Juliana Ferreira</strong><span>Belo Horizonte · MG</span></footer></blockquote>
            <blockquote className="reveal"><p>“Fomos com as crianças e deu super certo. O roteiro não ficou corrido e ainda pegaram passeios que elas curtiram bastante.”</p><footer><strong>Pedro Santana</strong><span>Rio de Janeiro · RJ</span></footer></blockquote>
          </div>
        </div>
      </section>

      <section className="personal section">
        <div className="shell personal__grid">
          <div className="personal__copy reveal">
            <p className="eyebrow">A sua viagem, não qualquer viagem</p>
            <h2>Bonito muda<br/><em>com quem vive.</em></h2>
            <p>Uma viagem a dois pede um ritmo. Com crianças, outro. Há quem queira aventura desde cedo e quem prefira dias leves perto da água.</p>
            <p>Conte como você imagina seus dias. A Em Bonito MS ajuda a encontrar o equilíbrio certo.</p>
          </div>
          <div className="personal__profiles reveal">
            <span>Casal</span><span>Família</span><span>Aventura</span><span>Descanso</span><span>Primeira viagem</span><span>Poucos dias</span>
          </div>
        </div>
      </section>

      <section className="plan section" id="planeje">
        <div className="shell plan__grid">
          <div className="plan__heading reveal"><p className="eyebrow">Planeje sua viagem</p><h2>Da vontade de ir<br/>ao roteiro <em>pronto.</em></h2></div>
          <ol className="steps reveal">
            <li><span>1</span><div><strong>Você conta sobre a viagem</strong><p>Datas, companhia, ritmo e o que não pode faltar.</p></div></li>
            <li><span>2</span><div><strong>Nossa equipe combina as possibilidades</strong><p>Um roteiro coerente, sem perder tempo com escolhas aleatórias.</p></div></li>
            <li><span>3</span><div><strong>Você chega para viver Bonito</strong><p>Com suporte humano antes e durante a experiência.</p></div></li>
          </ol>
          <div className="plan__action reveal"><p>Atendimento humano, direto pelo WhatsApp.</p><a className="button button--coral" href={CONTACT_URL}><WhatsAppIcon /> Começar meu planejamento</a><small>Sem compromisso</small></div>
        </div>
      </section>

      <section className="final-cta">
        <img src="/images/destino/final-rio-cristalino.jpg" alt="Pessoa contemplando a água azul de uma nascente em Bonito" width="1440" height="1920" loading="lazy" />
        <div className="final-cta__content shell reveal"><p className="eyebrow eyebrow--light">Bonito está esperando</p><h2>O próximo mergulho<br/><em>pode ser o seu.</em></h2><a className="button button--light" href={CONTACT_URL}>Falar com um especialista <ArrowIcon /></a></div>
      </section>
    </main>

    <footer className="footer">
      <div className="shell footer__top">
        <Brand light />
        <p>Sua agência especializada em experiências únicas na capital mundial do ecoturismo.</p>
        <div className="footer__contact"><span>Bonito, Mato Grosso do Sul</span><a href="tel:+5567992643282">(67) 99264-3282</a><a href="mailto:bonistar@bonistar.com.br">bonistar@bonistar.com.br</a></div>
        <nav aria-label="Links do rodapé"><a href="#descubra">O destino</a><a href="#experiencias">Experiências</a><a href="#por-que-nos">Por que nós</a><a href="https://www.embonitoms.com.br/politica-de-compra">Política de compra</a></nav>
      </div>
      <div className="shell footer__bottom"><span>© 2026 Bonistar Viagens. Todos os direitos reservados.</span><div><a href="https://www.instagram.com/bonistarviagens" aria-label="Instagram da Bonistar">Instagram</a><a href="https://www.facebook.com/bonistarviagens/" aria-label="Facebook da Bonistar">Facebook</a></div></div>
    </footer>
    <a className="floating-whatsapp" href={CONTACT_URL} aria-label="Planejar viagem pelo WhatsApp"><WhatsAppIcon /><span>Planejar viagem</span></a>
  </>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
