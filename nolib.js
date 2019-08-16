function el(ctype, opts, ...children) {
    let [type, ...classes] = ctype.split("."), parent = undefined;
    let d = type[0] === "#" ? document.getElementById(type.slice(1)) : document.createElement(type);
    classes.forEach(c => d.classList.add(c));
    if (opts) {
        Object.keys(opts).forEach(k => {
            if (k.slice(0, 2) === "s_") {
                d.style[k.slice(2)] = opts[k];
            } else if (k === "parent") {
                parent = opts[k];
            } else {
                d[k] = opts[k];
            }
        });
    }
    children.forEach(c => d.appendChild(c));
    if (parent) parent.appendChild(d);
    return d;
}

function drag(event, f) {
    let glass = el("div",
                   {parent: document.body,
                    s_position: "fixed",
                    s_left: "0px",
                    s_top: "0px",
                    s_right: "0px",
                    s_bottom: "0px"});
    event.preventDefault();
    event.stopPropagation();
    f(event.clientX, event.clientY, 0); // down
    function mm(event) {
        event.preventDefault();
        event.stopPropagation();
        f(event.clientX, event.clientY, 1); // dragging
    }
    function mu(event) {
        document.body.removeChild(glass);
        document.removeEventListener("mousemove", mm);
        document.removeEventListener("mouseup", mu);
        f(event.clientX, event.clientY, 2); // up
    }
    document.addEventListener("mousemove", mm);
    document.addEventListener("mouseup", mu);
}

function ext(obj, m, f) {
    let oldf = obj[m];
    obj[m] = (...args) => { return f.call(obj, oldf, ...args); };
}

function extBefore(obj, m, f) {
    ext(obj, m, (oldf, ...args) => { f.call(obj, ...args); return oldf.call(obj, ...args); });
}

function extAfter(obj, m, f) {
    ext(obj, m, (oldf, ...args) => { oldf.call(obj, ...args); return f.call(obj, ...args); });
}
