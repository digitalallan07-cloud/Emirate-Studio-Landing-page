// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Button Hover Animation =====
const buttons = document.querySelectorAll('.cta-button');
buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'scale(1.05)';
  });
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});

// ===== Portfolio Image Hover Animation =====
const portfolioImages = document.querySelectorAll('.portfolio img');
portfolioImages.forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
    img.style.transition = 'transform 0.3s ease';
  });
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
  });
});

// ===== Lead Form Submission =====
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      service: form.service.value
    };
    
    // Here you can integrate with a backend or email API
    console.log('Lead submitted:', formData);
    
    // Show thank you message
    alert('Thank you! Your request has been submitted.');
    
    // Reset form
    form.reset();
  });
}

// ===== WhatsApp Button Click =====
// (Optional: already has href, so this is extra for animation)
const whatsappBtn = document.querySelector('.whatsapp-btn');
if (whatsappBtn) {
  whatsappBtn.addEventListener('mouseenter', () => {
    whatsappBtn.style.transform = 'scale(1.2)';
  });
  whatsappBtn.addEventListener('mouseleave', () => {
    whatsappBtn.style.transform = 'scale(1)';
  });
}
