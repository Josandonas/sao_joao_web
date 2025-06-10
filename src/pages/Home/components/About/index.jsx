import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AboutSection,
  AboutContainer,
  AboutContent,
  AboutText,
  AboutParagraph,
  AboutSignature,
  TextControls,
  TextControlButton
} from './styles';

/**
 * Componente da seção "Sobre o Projeto" na página inicial
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.fontSizeControls - Funções para controlar o tamanho da fonte
 */
const About = ({ fontSizeControls }) => {
  const { t } = useTranslation();
  const { increaseFontSize, decreaseFontSize, resetFontSize } = fontSizeControls;
  const textContainerRef = useRef(null);

  useEffect(() => {
    // Função para verificar se há overflow e adicionar classe correspondente
    const checkOverflow = () => {
      const container = textContainerRef.current;
      if (container) {
        if (container.scrollHeight > container.clientHeight) {
          container.classList.add('has-overflow');
        } else {
          container.classList.remove('has-overflow');
        }
      }
    };

    // Verificar overflow inicial
    checkOverflow();

    // Verificar overflow quando o tamanho da fonte mudar
    const observer = new MutationObserver(checkOverflow);
    if (textContainerRef.current) {
      observer.observe(textContainerRef.current.parentElement, { attributes: true, attributeFilter: ['style'] });
    }

    // Verificar overflow em caso de redimensionamento da janela
    window.addEventListener('resize', checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <AboutSection className="about-section">
      <AboutContainer>
        <AboutContent>
          {/* Controles de zoom posicionados acima do conteúdo */}
          <TextControls>
            <span style={{ marginRight: '10px', fontSize: '14px', fontWeight: '500', color: '#444' }}>
              {t('home.textSize', 'Tamanho do texto')}:
            </span>
            <TextControlButton onClick={increaseFontSize} aria-label="Aumentar texto">
              A+
            </TextControlButton>
            <TextControlButton onClick={decreaseFontSize} aria-label="Diminuir texto">
              A-
            </TextControlButton>
            <TextControlButton onClick={resetFontSize} aria-label="Restaurar tamanho padrão do texto" style={{ fontSize: '13px' }}>
              A=
            </TextControlButton>
          </TextControls>
          
          <div className="content-wrapper">
            <div className="image-container">
              <img 
                src="/assets/images/backgrounds/carrosel_home/img (1).jpeg" 
                alt="Porto de Corumbá" 
                className="blend-image"
              />
            </div>
            <AboutText ref={textContainerRef}>
              <AboutParagraph>{t('home.about.paragraph1')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph2')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph3')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph4')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph5')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph6')}</AboutParagraph>
              <AboutParagraph>{t('home.about.paragraph7')}</AboutParagraph>
              <AboutSignature>
                {t('home.about.curator')}
                <span>{t('home.about.curatorTitle')}</span>
              </AboutSignature>
            </AboutText>
          </div>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;
