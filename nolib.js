function el(ctype, opts, ...children) {
    let [type, ...classes] = ctype.split("."), parent = undefined;
    let d = document.createElement(type);
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
