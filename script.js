'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


const openModal = function (e) {
    e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
console.log(document.documentElement);

// page navigation
document.querySelectorAll('.nav__links').forEach(function(el){
    el.addEventListener('click',function(e){
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'}); 

    });

});

// menu fade aniamtion

const handleHover = function(e){
    if(e.target.classList.contains('nav__link')){
        const link = e.target;
       const siblings =  link.closest('.nav').querySelectorAll('.nav__link');
       const logo = link.closest('.nav').querySelector('img');

       siblings.forEach( el =>{     
           if(el!==link){
               console.log(el);
               el.style.opacity=this;
           }
       });
       logo.style.opacity=this;
    }

}
const nav = document.querySelector('.nav');
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

// sticky navigation
const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;
const obCallBack = function(entries,observe){
  const [entry]=entries;
  if(!entry.isIntersecting)
  nav.classList.add('sticky');
  else
  nav.classList.remove('sticky');
};
const obsobject = {
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
};
const observe = new IntersectionObserver(obCallBack,obsobject);
observe.observe(header);


// reveal sections
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries,observer){
  const [entry] = entries;

   if(!entry.isIntersecting) return;
   entry.target.classList.remove('section--hidden');
   observer.unobserve(entry.target);

};
const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');

});


// lazy image loading
const imageTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(entries,observer){
  const [entry]=entries;
  
  if(!entry.isIntersecting)return;

  // replace src with data src
  
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load',()=>{
    entry.target.classList.remove('lazy-img');
  });
 observer.unobserve(entry.target);

}
const imageObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'-200px'
});
imageTargets.forEach(function(img){
  imageObserver.observe(img);
});

// creatung and appending cookie message
const footer = document.getElementsByClassName('footer');
message.innerHTML = 'We use cookie for improving functionalities and analytics.<button class="btn btn--close-cookie"> Got It!</button>';
// message.style.position="fixed";
header.append(message)
console.log(message);


// event listeners
btnScrollTo.addEventListener('scroll',(e) =>{
    section1.scrollIntoView({behavior:'smooth'});

});

// sliders
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
// slider.style.overflow="visible";

let curSlide = 0;


const nextSlide = function(){
  curSlide++;
  if(curSlide==3)
  curSlide=0;

  activateDots(curSlide);
  changeSlide(curSlide); 
}

const prevSlide = function(){
  curSlide--;
  if(curSlide==-1)
  curSlide=2;

  activateDots(curSlide);
  changeSlide(curSlide);
};

rightBtn.addEventListener('click',nextSlide);
leftBtn.addEventListener('click',prevSlide);

const changeSlide = function(index){
  slides.forEach((slide,i)=> slide.style.transform=`translateX(${(i-index)*100}%)`);
}

// keyboard events
document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowRight') nextSlide();
  else if(e.key === 'ArrowLeft') prevSlide();
});


// dots 
const dotContainer = document.querySelector('.dots');

const createDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class ="dots__dot" data-slide="${i}"></button>`);
  });
}

const activateDots = function(sde){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${sde}"]`).classList.add('dots__dot--active');
}
dotContainer.addEventListener('click',(e)=>{
  if(e.target.classList.contains('dots__dot')){
     curSlide = e.target.dataset.slide;
     activateDots(curSlide);
     changeSlide(curSlide);
  }
});

// calling functions in starting
createDots();
changeSlide(0);
activateDots(0);

// TABBED COMPONENTS
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',(e)=>{
    const  clicked = e.target.closest('.operations__tab');

    if(!clicked)return;
   
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

    tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');


});
