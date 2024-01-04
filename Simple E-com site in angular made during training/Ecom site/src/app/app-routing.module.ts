import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes:Routes=[
    // {path:'',component:HomePageComponent},
    {path:'',redirectTo:'home',pathMatch: 'full'},
    //there is prefix as well to to pathMatch which matches few characters
    {path:'home',component:HomePageComponent},
    {path:'products',component:ProductPageComponent, canActivate:[AuthGuard]},
    {path:'product-detail/:id',component:ProductDetailPageComponent, canActivate:[AuthGuard]},
    {path:'about',component:AboutPageComponent, canActivate:[AuthGuard]},
    {path:'contact',component:ContactPageComponent, canActivate:[AuthGuard]},
    {path:'register',component:RegisterPageComponent},
    {path:'login',component:LoginPageComponent},
    {path:'**',component:ErrorPageComponent},
]
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}