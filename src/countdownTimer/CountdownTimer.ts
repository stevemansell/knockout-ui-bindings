/// <reference path="../../lib/rainbowvis/rainbowvis.d.ts" />
/// <reference path="../../lib/sprintf/sprintf.d.ts" />

module Vls.Shared.UI.Ko {
    
    /* A countdown timer to a given date */
    export class CountdownTimer {

        /* Initialize the component */
        public init(element: HTMLElement, viewModelAccessor: KnockoutObservable<any>) {
            var start = viewModelAccessor();
            var $element = $(element);

            Vls.Shared.UI.Ko.CountdownTimer.UpdateDisplay(start, $element);
        }

        /** Update the value of the component */
        public update(element: HTMLElement, viewModelAccessor: KnockoutObservable<any>) {
            
        }

        /** Updates the bound element with the new countdown value */
        public static UpdateDisplay(start:Moment, $element:JQuery) {
            var startDays = start.diff(moment(), 'days');
            var startHours = start.diff(moment(), 'hours') % 24;
            var startMinutes = start.diff(moment(), 'minutes') % 60;
            var startSeconds = start.diff(moment(), 'seconds') % 60;
            var showSecondDelimiter = start.diff(moment(), 'seconds') % 2 == 0;
            var percentReady = Math.max(0, 300 - start.diff(moment(), 'seconds')) / 3;
 
           // In the last 5 minutes we fade the background color up to green
            var gradient = new Rainbow();
            gradient.setSpectrum('#444444', '#8BC544');
            var color = gradient.colourAt(percentReady);
            var countDownStyle = window.vsprintf('style="border-color:#%1$s; background-color:#%1$s"', [color]);

           // Compose HTML
            var template =
                '<div class="countdown row-fluid">' 
                + window.vsprintf('<div class="span2 countdown-item countdown-days"><div class="row-fluid countdown-value" %s>%\'02d</div><div class="row-fluid countdown-unit">%s</div></div>', [countDownStyle, startDays, 'days'])
                + window.vsprintf('<div class="offset1 span2 countdown-item countdown-hours"><div class="row-fluid countdown-value" %s>%\'02d</div><div class="row-fluid countdown-unit">%s</div></div>', [countDownStyle, 'hours'])
                + '<div class="span1 countdown-separator">:</span></div>'
                + window.vsprintf('<div class="span2 countdown-item countdown-minutes"><div class="row-fluid countdown-value" %s>%\'02d</div><div class="row-fluid countdown-unit">%s</div></div>', [countDownStyle, startMinutes, 'minutes'])
                + '<div class="span1 countdown-separator">' + (showSecondDelimiter ? ':' : '&nbsp;') + '</span></div>'
                + window.vsprintf('<div class="span2 countdown-item countdown-seconds"><div class="row-fluid countdown-value" %s>%\'02d</div><div class="row-fluid countdown-unit">%s</div></div>', [countDownStyle, startSeconds, 'seconds'])
                + '</div>';

            $element.html(template);

            setTimeout(() => {
                Vls.Shared.UI.Ko.CountdownTimer.UpdateDisplay(start, $element);
            }, 1000);
        }
    }
}

// Tie class into ko's bindingHandlers
(<any>ko.bindingHandlers).countdownTimer = Vls.Shared.UI.Ko.CountdownTimer.prototype;