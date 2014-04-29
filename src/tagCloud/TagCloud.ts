/// <reference path="../../lib/jqCloud/jqCloud.d.ts" />

module Vls.Shared.UI.Ko {

    /** @class TagCloudThe main binding class */
    export class TagCloud {

        static CalculatedId:number = 0;
        
        /** Called when the binding is created */
        public init(element: HTMLElement, viewModelAccessor: KnockoutObservable<TagCloudViewModel>) {

            if (element.id == '') {
                element.id = 'tagCloud_' + TagCloud.CalculatedId++;
            }

            
        }

        /** Called when one of the properties in the view model is changed */
        public update(element: HTMLElement, viewModelAccessor: KnockoutObservable<TagCloudViewModel>) {
            var $element = $(element);

            var viewModel = viewModelAccessor();
            if (viewModel.tags === undefined || ko.utils.unwrapObservable<Array<Tag>>(viewModel.tags)===undefined) {
                return;
            }

            var tags = ko.utils.unwrapObservable<Array<Tag>>(viewModel.tags);
            var options = ko.utils.unwrapObservable<Array<Tag>>(viewModel.options);
            this._log.debug('update: tags.length=' + tags.length + ', options=' + JSON.stringify(options));
            $element.empty();
            $element.jQCloud(tags, options);
        }
    }

    /** @class TagCloudViewModel - The view model expected by the TagCloud */
    export class TagCloudViewModel {
        public options: any;
        public tags: KnockoutObservableArray<Vls.Shared.UI.Ko.Tag> = ko.observableArray<Vls.Shared.UI.Ko.Tag>();
    }

    /** @class Tag - A single tag */
    export class Tag {
        public text: String;
        public weight: number;
        public link: string;
    }

    
}

// Tie class into ko's bindingHandlers
(<any>ko.bindingHandlers).tagCloud = Vls.Shared.UI.Ko.TagCloud.prototype;