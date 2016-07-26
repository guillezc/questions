var ProyectedsVar = function(){
	return{
		updateBody: function(){
			$("body").addClass("page-proyecteds");
			$('.carousel').carousel();
			$(".page-content").css("height", $(".page-content").height())
		},
		clean: function(){
			$("body").removeClass("page-proyecteds");
		},
		init: function(){
			this.updateBody();
		}
	}
}();

function CarouselDemoCtrl($scope)
{
    /**
     * @param {Array} args
     * @return {undefined}
     */
    function render(args)
    {
        /** @type {number} */
        var i = 0;
        /** @type {number} */
        var valuesLen = values.length;
        for (; i < valuesLen; i++)
        {
            values[i].id = args.pop();
        }
    }
    /**
     * @return {?}
     */
    function compiler()
    {
        /** @type {Array} */
        var e = [];
        /** @type {number} */
        var n = 0;
        for (; n < l; ++n)
        {
            /** @type {number} */
            e[n] = n;
        }
        return next(e);
    }
    /**
     * @param {Array} result
     * @return {?}
     */
    function next(result)
    {
        var value;
        var key;
        var index = result.length;
        if (index)
        {
            for (; --index;)
            {
                /** @type {number} */
                key = Math.floor(Math.random() * (index + 1));
                value = result[key];
                result[key] = result[index];
                result[index] = value;
            }
        }
        return result;
    }
    /** @type {number} */
    $scope.myInterval = 5E3;
    /** @type {boolean} */
    $scope.noWrapSlides = false;
    /** @type {number} */
    $scope.active = 0;
    /** @type {Array} */
    var values = $scope.slides = [];
    /** @type {number} */
    var l = 0;
    /**
     * @return {undefined}
     */
    $scope.addSlide = function()
    {
        /** @type {number} */
        var newWidth = 600 + values.length + 1;
        values.push(
        {
            image: "http://lorempixel.com/" + newWidth + "/300",
            text: ["Nice image", "Awesome photograph", "That is so cool", "I love that"][values.length % 4],
            id: l++
        });
    };
    /**
     * @return {undefined}
     */
    $scope.randomize = function()
    {
        var typePattern = compiler();
        render(typePattern);
    };
    /** @type {number} */
    var i = 0;
    for (; i < 4; i++)
    {
        $scope.addSlide();
    }
}