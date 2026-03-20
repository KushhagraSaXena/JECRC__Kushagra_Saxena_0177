import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-feedback-form',
  imports: [CommonModule,FormsModule  ],
  templateUrl: './feedback-form.component.html',
  styleUrl: './feedback-form.component.css'
})
export class FeedbackFormComponent {
  //Dropdown options
  departments = ['HR', 'Development', 'Design', 'QA'];
  
  //Skills Checkbox
  allSkills = ['Angular', 'React', 'Node', 'Python'];

  //Model For two-way binding
  feedback = {
    name: '',
    email: '',
    department: '',
    rating: '',
    comments: '',
    skills: [] as string[]
  };

//submit handler
  submitForm(form: NgForm) {
    // Handle form submission
    if(form.valid) {
      // Process the form data
      console.log("Feedback Submitted: ✅", this.feedback);
      alert(JSON.stringify(this.feedback,null,2));
      form.resetForm();
      this.feedback.skills = []; //reset skills manually
    }else{
      alert('Please fill out the form correctly.');
    }
  }

  //Update Skills array
  updateSkills(skill: string, isChecked: boolean) {
    if(isChecked){
      this.feedback.skills.push(skill);
    }
    else {
      const index = this.feedback.skills.indexOf(skill);
      if (index >= 0) {
        this.feedback.skills.splice(index, 1);
      }
    }
  }
}

