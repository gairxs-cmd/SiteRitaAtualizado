export const WHATSAPP_NUMBER = '5511916623062'

export const contactMessages = {
  appointment: 'Olá! Gostaria de agendar uma avaliação com a Dra. Rita de Cássia.',
  questions: 'Olá! Gostaria de tirar algumas dúvidas sobre os atendimentos da Dra. Rita de Cássia.',
}

export function whatsappLink(kind = 'appointment') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessages[kind])}`
}
