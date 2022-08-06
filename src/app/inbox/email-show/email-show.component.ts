import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email, EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  email: Email;
  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    // this will run before the template is rendered!!!
    // use resolver to get the data based on route data
    this.route.data.subscribe(({email}) => {
      this.email = email
    })
  }

  ngOnInit(): void {

  }

}
