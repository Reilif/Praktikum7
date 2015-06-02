import {ComponentAnnotation as Component, ViewAnnotation as View, bootstrap} from 'angular2/angular2';
import {Praktikum7} from 'praktikum-7';

@Component({
  selector: 'main'
})

@View({
  directives: [Praktikum7],
  template: `
    <praktikum-7></praktikum-7>
  `
})

class Main {

}

bootstrap(Main);
