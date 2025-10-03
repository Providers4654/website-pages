<script>
  document.addEventListener('DOMContentLoaded', function () {
    const referralSelect = document.getElementById('referral-select');
    const referralExtra = document.getElementById('referral-extra');
    const referralLabel = document.getElementById('referral-extra-label');
    const stateSelect = document.getElementById('state-select');
    const stateOtherInput = document.getElementById('state-other-input');
    const stateOtherText = document.getElementById('state-other-text');
    const form = document.getElementById('consult-form');
    const successMessage = document.getElementById('success-message');
    const phoneInput = document.querySelector('input[name="phone"]');

    // Phone number formatting
    phoneInput.addEventListener('input', function (e) {
      let input = e.target.value.replace(/\D/g, '').substring(0, 10);
      const area = input.substring(0, 3);
      const middle = input.substring(3, 6);
      const last = input.substring(6, 10);
      if (input.length > 6) {
        e.target.value = `(${area}) ${middle}-${last}`;
      } else if (input.length > 3) {
        e.target.value = `(${area}) ${middle}`;
      } else if (input.length > 0) {
        e.target.value = `(${area}`;
      }
    });

    // Referral dropdown logic
    referralSelect.addEventListener('change', function () {
      const val = this.value;
      const show = val === 'Friend/Referral' || val === 'Other';
      referralExtra.classList.toggle('hidden', !show);
      referralLabel.textContent = val === 'Friend/Referral'
        ? 'If referred by a friend, who?'
        : 'Please specify:';
    });

    // State dropdown logic
    stateSelect.addEventListener('change', function () {
      const show = this.value === 'Other';
      stateOtherInput.classList.toggle('hidden', !show);
      if (show) {
        stateOtherText.setAttribute('required', 'required');
      } else {
        stateOtherText.removeAttribute('required');
        stateOtherText.value = '';
      }
    });

    // Form submission handler
   form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Extract the numeric value from the phone input
  const phoneValue = phoneInput.value.replace(/\D/g, '');

  // Validate phone number length
  if (phoneValue.length !== 10) {
    alert('Please enter a valid 10-digit phone number.');
    phoneInput.focus();
    return;
  }

  const formData = new FormData(form);
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
  .then(response => {
    if (response.ok) {
      form.classList.add('hidden');
      successMessage.classList.remove('hidden');
      const offset = document.querySelector('.custom-form-container').getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    } else {
      alert('There was a problem submitting your form. Please try again.');
    }
  })
  .catch(() => {
    alert('There was a problem submitting your form. Please try again.');
  });
});

});

</script>
