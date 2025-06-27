# Referências de Tradução - Módulo de Depoimentos

Este documento lista todas as chaves de tradução utilizadas no módulo de Depoimentos.
Use como referência para implementar traduções completas em todos os idiomas suportados.

## Estrutura de Chaves

```json
{
  "testimonials": {
    "title": "Depoimentos",
    "categories": {
      "all": "Todos",
      "personal": "Histórias Pessoais",
      "traditions": "Tradições",
      "cultural": "Manifestações Culturais",
      "faith": "Fé e Devoção",
      "academic": "Pesquisadores"
    },
    "watchVideo": "Assistir Depoimento",
    "video": {
      "unsupportedBrowser": "Seu navegador não suporta a reprodução de vídeos."
    },
    "form": {
      "shareTestimonial": "Compartilhe seu Depoimento",
      "closeForm": "Fechar Formulário",
      "title": "Registre seu Depoimento",
      "name": "Nome Completo",
      "namePlaceholder": "Seu nome completo",
      "location": "Localidade",
      "locationPlaceholder": "Cidade, Estado",
      "category": "Categoria",
      "selectCategory": "Selecione uma categoria",
      "testimonial": "Seu Depoimento",
      "testimonialPlaceholder": "Compartilhe sua história ou experiência relacionada ao Banho de São João",
      "video": "Upload de Vídeo (opcional)",
      "videoHelp": "Tamanho máximo: 50MB. Formatos aceitos: MP4, MOV, AVI",
      "submit": "Enviar Depoimento"
    }
  }
}
```

## Uso nos Componentes

### Componente Principal (index.jsx)
- `{t('testimonials.title')}`

### CategoryFilter
- `{t('testimonials.categories.all')}`
- `{t('testimonials.categories.personal')}`
- `{t('testimonials.categories.traditions')}`
- `{t('testimonials.categories.cultural')}`
- `{t('testimonials.categories.faith')}`
- `{t('testimonials.categories.academic')}`

### TestimonialList
- `{t('testimonials.watchVideo')}`

### TestimonialVideo
- `{t('testimonials.video.unsupportedBrowser')}`

### TestimonialForm
- `{t('testimonials.form.shareTestimonial')}`
- `{t('testimonials.form.closeForm')}`
- `{t('testimonials.form.title')}`
- `{t('testimonials.form.name')}`
- `{t('testimonials.form.namePlaceholder')}`
- `{t('testimonials.form.location')}`
- `{t('testimonials.form.locationPlaceholder')}`
- `{t('testimonials.form.category')}`
- `{t('testimonials.form.selectCategory')}`
- `{t('testimonials.form.testimonial')}`
- `{t('testimonials.form.testimonialPlaceholder')}`
- `{t('testimonials.form.video')}`
- `{t('testimonials.form.videoHelp')}`
- `{t('testimonials.form.submit')}`

## Recomendações

1. Garanta que todas as chaves estejam presentes nos arquivos de tradução para todos os idiomas suportados.
2. Para manter a consistência, use exatamente as mesmas chaves em todos os componentes.
3. Em uma implementação mais avançada, considere mover os textos dos depoimentos para arquivos de tradução, usando chaves dinâmicas como `testimonials.items.${id}.quote`.
4. O arquivo `testimonialData.js` deve ser considerado apenas como dados, com textos servindo como fallback caso as traduções não estejam disponíveis.
