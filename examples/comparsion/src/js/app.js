
(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

a
(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()

(function(){
function useAnimationTrigger({ animation, target, options = {} }) {
	const SELECTORS = {
		animTimeline: '.js-anim-timeline',
		animTrigger: '.js-anim-trigger',
	};
	let isScrolled = false;

	if (!target || !animation) {
		return null;
	}

	const handleScroll = () => {
		isScrolled = true;
		window.removeEventListener('scroll', handleScroll);
	};
	window.addEventListener('scroll', handleScroll);

	const $closestTimelineNode = target.closest(SELECTORS.animTimeline) || target;
	const $closestTriggerNode = target.closest(SELECTORS.animTrigger) || target;

	const defaultConfig = {
		start: 'top 75%',
		end: 'top 75%',
		duration: 1,
		ease: 'none',
		delay: 0,
		offset: 0,
		label: '>',
		markers: false,
		...options,
	};

	const { dataset } = target;

	const config = {
		start: dataset.animStart || defaultConfig.start,
		end: dataset.animeEnd || defaultConfig.end,
		ease: dataset.animEase || defaultConfig.ease,
		duration: Number(dataset.animDuration) || defaultConfig.duration,
		delay: Number(dataset.animDelay) || defaultConfig.delay,
		offset: Number(dataset.animOffset) || defaultConfig.offset,
		label: dataset.animLabel || defaultConfig.label,
		markers: defaultConfig.markers,
	};

	if (!$closestTimelineNode.timeline) {
		$closestTimelineNode.timeline = gsap.timeline({
			delay: Number($closestTimelineNode.dataset.timelineDelay) || 0,
			onUpdate: () => {},
		});
	}
	const { timeline } = $closestTimelineNode;
	timeline.addLabel('start');

	const trigger = ScrollTrigger.create({
		trigger: $closestTriggerNode,
		start: config.start,
		end: config.end,
		once: true,
		markers: config.markers,
		onEnter: () => {
			let { label } = config;

			let { lastTimeMark = 0 } = timeline;
			const tlDuration = timeline.duration();

			const labelTimeValue = Number(label.match(/-?\d+(?:\.\d+)?/, 'g')?.[0]) || 0; // for time in label
			const labelSign = !label.includes('-=') ? 1 : -1; // check label sign
			const labelPosition = !label.includes('<'); // check arrows

			let labelOrigin = labelPosition ? tlDuration : lastTimeMark;
			let labelTimelinePosition = labelOrigin + labelTimeValue * labelSign;
			let safeLabelTimelinePosition = Math.max(timeline.time(), labelTimelinePosition || 0);

			const animTween = animation(config);

			timeline.add(animTween, safeLabelTimelinePosition);
			timeline.lastTimeMark = safeLabelTimelinePosition;
		},
	});

	return () => {
		trigger.kill();
		timeline.clear();
	};
}
})()


console.log('hi')