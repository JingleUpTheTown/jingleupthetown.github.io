// CONFIGURATION: public form endpoint only. NEVER put API tokens or Twilio secrets here.
const BUSINESS_EMAIL = "JingleUpTheTown@gmail.com";
const BUSINESS_PHONE = "";
const FORMSPREE_ENDPOINT = ""; // Example: https://formspree.io/f/abcdefgh

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open', !expanded);
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
const phone = BUSINESS_PHONE.replace(/[^+\d]/g, '');
const callLink = document.getElementById('call-link');
const textLink = document.getElementById('text-link');
const emailLink = document.getElementById('email-link');
if (phone) { callLink.href = `tel:${phone}`; textLink.href = `sms:${phone}`; }
else { callLink.hidden = true; textLink.hidden = true; }
if (BUSINESS_EMAIL) emailLink.href = `mailto:${BUSINESS_EMAIL}`;
else emailLink.hidden = true;
if (phone || BUSINESS_EMAIL) document.getElementById('contact-note').textContent = 'We look forward to hearing from you!';

// Accessible date picker. This is NOT a live availability feed.
const dateInput = document.getElementById('customer-date');
const calendarDays = document.getElementById('calendar-days');
const monthLabel = document.getElementById('calendar-month');
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const localISO = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
dateInput.min = localISO(today);
let viewing = new Date(today.getFullYear(), today.getMonth(), 1);
function renderCalendar() {
  const year = viewing.getFullYear(), month = viewing.getMonth();
  monthLabel.textContent = viewing.toLocaleDateString('en-US',{month:'long',year:'numeric'});
  calendarDays.replaceChildren();
  for (let i=0;i<new Date(year,month,1).getDay();i++) {
    const spacer=document.createElement('span');spacer.className='calendar-blank';calendarDays.append(spacer);
  }
  const daysInMonth=new Date(year,month+1,0).getDate();
  for(let day=1;day<=daysInMonth;day++){
    const d=new Date(year,month,day),iso=localISO(d),button=document.createElement('button');
    button.type='button';button.textContent=String(day);button.className='calendar-day';
    button.disabled=d<today;button.setAttribute('aria-label',d.toLocaleDateString('en-US',{dateStyle:'full'}));
    button.setAttribute('aria-pressed',String(dateInput.value===iso));
    if(dateInput.value===iso)button.classList.add('selected');
    button.addEventListener('click',()=>{dateInput.value=iso;renderCalendar();});
    calendarDays.append(button);
  }
  document.getElementById('calendar-prev').disabled=year===today.getFullYear()&&month===today.getMonth();
}
document.getElementById('calendar-prev').addEventListener('click',()=>{viewing=new Date(viewing.getFullYear(),viewing.getMonth()-1,1);renderCalendar();});
document.getElementById('calendar-next').addEventListener('click',()=>{viewing=new Date(viewing.getFullYear(),viewing.getMonth()+1,1);renderCalendar();});
dateInput.addEventListener('change',()=>{if(dateInput.value){const [y,m]=dateInput.value.split('-').map(Number);viewing=new Date(y,m-1,1);}renderCalendar();});
renderCalendar();

const form=document.getElementById('quote-form');
const status=document.getElementById('form-status');
const submit=document.getElementById('submit-request');
form.addEventListener('submit',async event=>{
  event.preventDefault();if(!form.reportValidity())return;
  if(!/^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(FORMSPREE_ENDPOINT)){
    // Until Formspree is connected, offer an email draft instead of pretending a request was submitted.
    const data = new FormData(form);
    const subject = 'Jingle Up the Town — Date and quote request';
    const body = Array.from(data.entries()).map(([key,value]) => `${key}: ${value}`).join('\n') + '\n\nREQUEST ONLY — appointment not confirmed.';
    status.textContent = 'Your email app will open with a prepared request. Please press Send there. Your appointment is not confirmed until we reply.';
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return;
  }
  const data=new FormData(form);
  data.append('_subject','Jingle Up the Town — New date and quote request');
  data.append('booking_status','PENDING — not confirmed');
  submit.disabled=true;status.textContent='Sending your request…';
  try{
    const response=await fetch(FORMSPREE_ENDPOINT,{method:'POST',body:data,headers:{Accept:'application/json'}});
    if(!response.ok)throw new Error('Submission failed');
    status.textContent='Request received! Your date is NOT confirmed yet. We will contact you to review the job, price, and availability.';
    form.reset();renderCalendar();
  }catch(error){status.textContent='Sorry, the request could not be sent. Please try again or contact us directly.';}
  finally{submit.disabled=false;}
});
