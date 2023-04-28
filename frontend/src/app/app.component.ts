import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  username:String ="";
  title = 'G13 Gaming';

  ngOnInit():void{
    const name=sessionStorage.getItem('currentUser');
    if(name!=null){
      this.username=name;
    }
  }

}
