import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ModalGeneralEditComponent } from './modal-general-edit/modal-general-edit';
import { ModalConfigGeneratorComponent } from './modal-config-generator/modal-config-generator';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [
    ModalGeneralEditComponent,
    ModalConfigGeneratorComponent
  ],
  entryComponents: [
    ModalGeneralEditComponent,
    ModalConfigGeneratorComponent
  ],
	imports: [IonicModule, PipesModule],
	exports: [
    ModalGeneralEditComponent,
    ModalConfigGeneratorComponent
  ]
})
export class ComponentsModule {}
