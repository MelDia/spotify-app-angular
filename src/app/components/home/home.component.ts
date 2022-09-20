import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public newReleases: any[] = [];
  public loading: boolean;

  constructor(
    private serv : SpotifyService,
    private route : Router
  ) { 

    this.loading = true;

    // this.serv.getNewRelease();

  }

  ngOnInit(): void {
    
    this.services();
    
  }

  public services() {
    this.serv.getNewRelease().subscribe(
      (res:any) => {
        this.newReleases = res;
        console.log('ARTISTA ->', this.newReleases)
        this.loading = false;
      }
    )
  }

  goArtist(newReleases: any) {
    console.log('ITEM ->', newReleases.artists[0].id);
    this.route.navigate(['/artist', newReleases.artists[0].id])
  }

}
