import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

class RevealOnScroll
{
	constructor(els, thresholdPercent)
	{
		this.thresholdPercent = thresholdPercent;
		this.itemsToReveal = els;
		this.browserHeight = window.innerHeight;
		this.hideInitially();
		this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
		this.events();
	}

	events()
	{
		window.addEventListener("scroll", this.scrollThrottle);
		window.addEventListener("resize", debounce(() =>
			{
				console.log("resizing detected");
				this.browserHeight = window.innerHeight;
			}), 300);
	}

	calcCaller()
	{
		//console.log("Scroll function ran");
		this.itemsToReveal.forEach(
			el =>
			{
				if (el.isRevealed == false)
				{
					this.calculateIsScrolledTo(el);	
				}
			});
	}

	calculateIsScrolledTo(el)
	{
		if (window.scrollY + this.browserHeight > el.offsetTop == false)
			return;

		console.log("Element got calculated");
		let scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100;
		if (scrollPercent < this.thresholdPercent)
		{
			el.classList.add("reveal-item--is-visible");
			el.isRevealed = true;

			if (el.isLastItem)
			{
				window.removeEventListener("scroll", this.scrollThrottle);
			}
		}
	}

	hideInitially()
	{
		this.itemsToReveal.forEach(
			el =>
			{
				el.classList.add("reveal-item");
				el.isRevealed = false;
			});

		this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
	}
}

export default RevealOnScroll;