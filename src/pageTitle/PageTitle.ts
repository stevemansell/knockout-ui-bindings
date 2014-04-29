module Vls.UI.Ko.Bindings {
    /* A knockout binding that permits changing of the document page title */
    export class PageTitle {
        public init(element: HTMLElement, model: KnockoutObservable<string>) {
            
        }

        public update(element: HTMLElement, model: KnockoutObservable<string>) {
            document.title = model();
        }


    }
} 

ko.bindingHandlers['pageTitle'] = Vls.UI.Ko.Bindings.PageTitle.prototype;