import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email, EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email
  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: 'dgsrg@zfg',
      from: `${this.authService.username}@angular-email.com`,
      subject: '',
      text: '',
      html: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    })
  }

}
