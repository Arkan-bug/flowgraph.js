// ==========================================================
// NODE GRAPH — CORE LIB (Stable Version)
// Auteur : Yrieix MICHAUD
// ==========================================================

class NodeCanvas extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        this.shadowRoot.innerHTML = `
        <style>

            :host{
                display:block;
                position:relative;
                width:100%;
                height:var(--canvas-height,600px);
                overflow:hidden;

                background:var(--node-bg,#f1f5f9);

                /* Variables stylables */
                --line-color:#0f172a;
                --line-width:2;
            }

            svg{
                position:absolute;
                inset:0;
                width:100%;
                height:100%;
                pointer-events:none;
                z-index:0;
            }

            path{
                fill:none;
                stroke:var(--line-color);
                stroke-width:var(--line-width);
            }

        </style>

        <svg></svg>
        <slot></slot>
        `;

        this.svg = this.shadowRoot.querySelector("svg");

        let raf = null;

        // redraw optimisé
        this.addEventListener('node-move', () => {

            if (raf) return;

            raf = requestAnimationFrame(() => {
                this.drawAllLinks();
                raf = null;
            });

        });

        setTimeout(() => {
            this.loadPositions();
            this.drawAllLinks();
        }, 60);

        // redraw si resize
        new ResizeObserver(() => {
            this.drawAllLinks();
        }).observe(this);
    }


    drawAllLinks() {

        this.svg.innerHTML = '';

        const nodes = this.querySelectorAll('node-item');

        nodes.forEach(node => {

            const targets = node.getAttribute('to');

            if (!targets) return;

            targets.split(',').forEach(id => {

                const target = this.querySelector(`#${id.trim()}`);

                if (target) {
                    this.drawCurve(node, target);
                }

            });

        });
    }


    drawCurve(start, end) {

        const canvasRect = this.getBoundingClientRect();
        const r1 = start.getBoundingClientRect();
        const r2 = end.getBoundingClientRect();

        const x1 = r1.right - canvasRect.left;
        const y1 = r1.top + r1.height / 2 - canvasRect.top;

        const x2 = r2.left - canvasRect.left;
        const y2 = r2.top + r2.height / 2 - canvasRect.top;

        // courbe adaptative (beaucoup plus naturelle)
        const dx = Math.abs(x2 - x1);
        const curve = Math.max(80, dx * 0.5);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        path.setAttribute(
            "d",
            `M ${x1} ${y1} 
             C ${x1 + curve} ${y1}, 
               ${x2 - curve} ${y2}, 
               ${x2} ${y2}`
        );

        this.svg.appendChild(path);
    }


    savePosition(id, x, y) {

        const data = JSON.parse(localStorage.getItem('node_graph_pos') || "{}");

        data[id] = { x, y };

        localStorage.setItem('node_graph_pos', JSON.stringify(data));
    }


    loadPositions() {

        const data = JSON.parse(localStorage.getItem('node_graph_pos') || "{}");

        Object.keys(data).forEach(id => {

            const el = this.querySelector(`#${id}`);

            if (el) {
                el.style.left = data[id].x + "px";
                el.style.top = data[id].y + "px";
            }

        });
    }
}

class NodeItem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    connectedCallback() {

        this.shadowRoot.innerHTML = `
        <style>

            :host{
                position:absolute;
                min-width:140px;
                cursor:grab;
                user-select:none;

                --node-bg:white;
                --node-border:1px solid #cbd5e1;
                --node-text:#0f172a;
                --radius:10px;
            }

            .card{
                background:var(--node-bg);
                border:var(--node-border);
                border-radius:var(--radius);
                padding:12px;
                text-align:center;
                color:var(--node-text);
                font-family:system-ui;
                font-size:14px;
                box-shadow:0 6px 18px rgba(0,0,0,0.06);
            }

        </style>

        <div class="card">
            <slot>Node</slot>
        </div>
        `;

        this.initDrag();
    }


    initDrag() {

        let offsetX, offsetY;
        let raf = null;

        const mouseMove = (e) => {

            if (raf) return;

            raf = requestAnimationFrame(() => {

                this.style.left = (e.clientX - offsetX) + 'px';
                this.style.top = (e.clientY - offsetY) + 'px';

                this.dispatchEvent(
                    new CustomEvent('node-move', { bubbles: true })
                );

                raf = null;

            });
        };

        const mouseUp = () => {

            document.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseup', mouseUp);

            const canvas = this.closest('node-canvas');

            canvas?.savePosition(this.id, this.offsetLeft, this.offsetTop);
        };

        this.addEventListener('mousedown', (e) => {

            offsetX = e.clientX - this.offsetLeft;
            offsetY = e.clientY - this.offsetTop;

            document.addEventListener('mousemove', mouseMove);
            document.addEventListener('mouseup', mouseUp);

        });

    }

}


customElements.define('node-canvas', NodeCanvas);
customElements.define('node-item', NodeItem);
