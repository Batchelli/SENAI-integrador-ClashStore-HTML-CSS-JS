const swiperEl = document.querySelector('swiper-container')
				Object.assign(swiperEl, {
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					clickable: true,
				},
				breakpoints: {
					240:{
					auto:"true",
					loop:"true",
					slidesPerView: 1,
					},
					500:{
					auto:"true",
					loop:"true",
					slidesPerView: 1,
					},
					768: {
					auto:"true",
					loop:"true",
					slidesPerView: 2,
					spaceBetween: 40,
					},
					920: {
					auto:"true",
					loop:"true",
					slidesPerView: 3,
					spaceBetween: 50,
					},
				},
				});
				swiperEl.initialize();