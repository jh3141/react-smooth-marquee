import React from "react";
import ReactDOM from "react-dom";

export default class Marquee extends React.Component
{
    constructor(props)
    {
        super(props);
        this.setOuterRef = this.setOuterRef_.bind(this);
        this.setContentRef = this.setContentRef_.bind(this);
        this.tick = this.tick_.bind(this);
        this.tickRequested = false;
        this.lastTimestamp = null;
        this.x = 0;
    }

    setOuterRef_(ref)
    {
        this.outerDiv = ref;
        this.start();
    }
    setContentRef_(ref)
    {
        this.innerDiv = ref;
        this.start ();
    }
    start ()
    {
        if (this.outerDiv && this.innerDiv && !this.tickRequested)
        {
            window.requestAnimationFrame(this.tick);
            this.tickRequested = true;
        }
    }
    tick_ (timestamp)
    {
        if (!this.outerDiv || !this.innerDiv)
        {
            // one or more components have been unmounted.  stop animation
            // until they are remounted (if ever)
            this.tickRequested = false;
            return;
        }

        if (this.lastTimestamp !== null)
        {
            this.updateAnimation (timestamp - this.lastTimestamp);
        }

        this.lastTimestamp = timestamp;
        window.requestAnimationFrame(this.tick);
        this.lastTimestamp = timestamp;
    }

    updateAnimation (deltaT)
    {
        this.x -= deltaT * this.getVelocity ();
        if (this.x + this.innerDiv.clientWidth < 0)
            this.x += this.innerDiv.clientWidth + this.outerDiv.clientWidth;
        this.innerDiv.style.transform = this.calculateTransform();
    }

    getVelocity ()
    {
        return this.props.velocity ? this.props.velocity : 0.12;
    }

    getStyle ()
    {
        return this.props.style ? this.props.style : null;
    }

    getContentStyle ()
    {
        const transform = { transform: this.calculateTransform() };
        const { contentStyle } = this.props;

        if (contentStyle)
            return Object.assign({}, transform, contentStyle)
        else
            return transform
    }

    render ()
    {
        return (
            <div className="Marquee" ref={this.setOuterRef} style={this.getStyle()}>
                <div className="MarqueeContent" ref={this.setContentRef} style={this.getContentStyle()}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    calculateTransform ()
    {
        return "translateX(" + this.x + "px)";
    }
}
