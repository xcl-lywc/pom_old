/*********************************************************************
 * 正在加载组件                                                       *
 * Created by zhangtao on 2017/12/13                                 *
 **********************************************************************/
let Loading = {
    _el: null,
    _elClassName: "ls-loading",

    _init: function () {
        let node = document.createElement("div");

        node.setAttribute("class", this._elClassName);
        node.style.display = "none";
        document.body.appendChild(node);
        this._el = node;
    },

    show: function () {
        
        this._el.style.display = "block";
    },

    hide: function () {
        this._el.style.display = "none";
    }
};
Loading._init();


export default Loading;