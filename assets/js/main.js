const slides = document.querySelectorAll(".slide");
const prevSlideBtn = document.querySelector("#prev-slide");
const nextSlideBtn = document.querySelector("#next-slide");
const slidesContainer = document.querySelector("#slides-container");
const slideFn = () => {
	let currentSlide = 2;

	const showSlides = () => {
		slides.forEach((slide, index) => {
			if (index === currentSlide) {
				slide.classList.add("active");
			} else {
				slide.classList.remove("active");
			}
		});
	};

	const goToNextSlide = () => {
		if (currentSlide === slides.length - 1) {
			currentSlide = 0;
		} else {
			currentSlide++;
		}

		showSlides();
	};

	// 2. ლექციაზე შექმნილ სლაიდერს დავამატოთ:
	//    2.1. დავამატოთ სლაიდების ავტომატური ცვლილება 5 წამიანი ინტერვალით
	//    2.2. როდესაც ავტომატურად ხდება სლაიდების შეცვლა თუ მაუსს მივიტან სურათთან, ავტომატური სლაიდი გაჩერდეს.
	//    2.3. თუ მაუსი მიტანილი მაქვს სურათზე და შემდეგ გამოვწევ სურათიდან, ავტომატური სლაიდი გაგრძელდეს. მოუსმინეთ  mouseenter, mouseleave  ივენთებს
	//    დამხმარე მასალა: https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
	// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event

	let slideInterval = setInterval(goToNextSlide, 5000);

	slidesContainer.addEventListener("mouseenter", () => {
		if (slideInterval) {
			// console.log("clear");
			clearInterval(slideInterval);
			slideInterval = null;
		}
	});
	slidesContainer.addEventListener("mouseleave", () => {
		// console.log("set");
		slideInterval = setInterval(goToNextSlide, 5000);
	});

	showSlides();
};

slideFn();

// 1. setTimeout ან setInterval - ის გამოყენებით გააკეთეთ საათი რომელიც იმუშავებს როგორც ნამდვილი სააათი. გამოიყენეთ ატვირთული სურათი (საათი.png).
const clock = document.querySelector("#clock");
const showTime = () => {
	const date = new Date();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	// 1 => 001
	clock.textContent = `${(hours + "").padStart(2, 0)}
	:${(minutes + "").padStart(2, 0)}
	:${(seconds + "").padStart(2, 0)}`;
};
showTime();
setInterval(showTime, 1000);

//  3*(optional) დავამატოთ მარტივი countdown რომელიც გვიჩვენებს მომდევნო ლექციამდე (3 დეკემბერი, 20:00) დარჩენილ დროს (დღე, საათი, წუთი)

const countdown = document.querySelector("#countdown");
const showCountdown = () => {
	const currentDate = new Date();
	const futureDate = new Date("Dec 20, 2024 20:00:00");
	const diff = futureDate - currentDate;
	// console.log(diff);

	const days = Math.floor(diff / 1000 / 60 / 60 / 24);
	const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
	const minutes = Math.floor(diff / 1000 / 60) % 60;
	const seconds = Math.floor(diff / 1000) % 60;

	countdown.textContent = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
};

showCountdown();

setInterval(showCountdown, 1000);
