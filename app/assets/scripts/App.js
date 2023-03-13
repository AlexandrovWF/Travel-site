import "../styles/styles.css";
import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";
//import Modal from "./modules/Modal";

//new Modal();
let stickyHeader = new StickyHeader();

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75);
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);

let mobileMenu = new MobileMenu();
let modal;

document.querySelectorAll(".open-modal").forEach(el =>
	{
		el.addEventListener("click", e =>
			{
				e.preventDefault();
				if (typeof modal == "undefined")//the modal is not yet loaded
				{
					import("./modules/Modal").then(x => //x is the Modal class
					{
						modal = new x.default();
						setTimeout(() => 
							{
								modal.openTheModal();
							}, 20);
					}
					).catch(() =>
					{
						console.log("We have a problem!");
					});
				}
				else
				{
					modal.openTheModal();
				}
			});
	});

if (module.hot)
{
	module.hot.accept();
	
}