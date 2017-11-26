    function deploy(el) {
		var id = el.getAttribute("data-deploy-title"),
		content = $("[data-deploy-content =" + id + "]"),
		wrap = $("[data-deploy-wrap =" + id + "]");

		if (wrap.height() == 0) {
        wrap.height(content.outerHeight(true));
    $(el).toggleClass("active");
		}
		else {
        wrap.height(0);
    $(el).toggleClass("active");
		}
	}
