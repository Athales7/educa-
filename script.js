// EducaCompartilha — comportamento do site

document.addEventListener('DOMContentLoaded', () => {
    /* Menu mobile */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        const aberto = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(aberto));
      });
      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          nav.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  
    /* Revelar elementos ao rolar */
    const revelaveis = document.querySelectorAll('.revelar');
    if ('IntersectionObserver' in window && revelaveis.length) {
      const observer = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observer.unobserve(entrada.target);
          }
        });
      }, { threshold: 0.15 });
      revelaveis.forEach((el) => observer.observe(el));
    } else {
      revelaveis.forEach((el) => el.classList.add('visivel'));
    }
  
    /* Filtros da página de doações */
    const chips = document.querySelectorAll('.chip');
    const cards = document.querySelectorAll('.item-card');
    const mural = document.querySelector('.mural');
    if (chips.length && cards.length) {
      chips.forEach((chip) => {
        chip.addEventListener('click', () => {
          chips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
          chip.setAttribute('aria-pressed', 'true');
          const categoria = chip.dataset.categoria;
          let visiveis = 0;
          cards.forEach((card) => {
            const mostra = categoria === 'todos' || card.dataset.categoria === categoria;
            card.style.display = mostra ? '' : 'none';
            if (mostra) visiveis += 1;
          });
          let vazio = mural.querySelector('.sem-resultados');
          if (visiveis === 0) {
            if (!vazio) {
              vazio = document.createElement('p');
              vazio.className = 'sem-resultados';
              vazio.textContent = 'Nenhum item nessa categoria por enquanto. Volte em breve ou publique uma doação!';
              mural.appendChild(vazio);
            }
          } else if (vazio) {
            vazio.remove();
          }
        });
      });
    }
  
    /* Formulário de cadastro */
    const form = document.querySelector('#form-doacao');
    if (form) {
      form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        let valido = true;
  
        form.querySelectorAll('[required]').forEach((campo) => {
          const wrapper = campo.closest('.campo');
          const preenchido = campo.type === 'checkbox' ? campo.checked : campo.value.trim() !== '';
          if (!preenchido) {
            valido = false;
            wrapper?.classList.add('invalido');
          } else {
            wrapper?.classList.remove('invalido');
          }
        });
  
        const categoriasMarcadas = form.querySelectorAll('.categorias input:checked').length;
        const avisoCategorias = document.querySelector('#aviso-categorias');
        if (categoriasMarcadas === 0) {
          valido = false;
          if (avisoCategorias) avisoCategorias.style.display = 'block';
        } else if (avisoCategorias) {
          avisoCategorias.style.display = 'none';
        }
  
        if (!valido) {
          form.querySelector('.campo.invalido input, .campo.invalido select, .campo.invalido textarea')
            ?.focus();
          return;
        }
  
        document.querySelector('.form-conteudo').classList.add('escondido');
        const confirmacao = document.querySelector('.confirmacao');
        confirmacao.classList.add('ativo');
        confirmacao.setAttribute('tabindex', '-1');
        confirmacao.focus();
      });
    }
  });