import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewprojectComponent } from './components/newproject/newproject.component';
import { MenuNewProjectComponent } from './components/menu-new-project/menu-new-project.component';
const routes: Routes = [{ path: '', component: NewprojectComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
