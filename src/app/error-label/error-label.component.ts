import { Component, OnInit, Renderer2, ViewEncapsulation, Input } from '@angular/core';
import { staticViewQueryIds } from '@angular/compiler';

@Component({
  selector: 'app-error-label',
  templateUrl: './error-label.component.html',
  styleUrls: ['./error-label.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ErrorLabelComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {

  }

  genereateError(text: string, type: string, tooltip?: string) {
    let formField = document.createElement("div");
    formField.classList.add("form-field");

    let alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    alertDiv.classList.add("alert-" + type);
    alertDiv.setAttribute("role", "alert");

    let button = document.createElement("button");
    button.classList.add("close-alert")
    button.innerText = "x";

    let icon = document.createElement("i");
    icon.innerText = "error";
    icon.classList.add("material-icons");
    if (tooltip) {
      let span = document.createElement("span");
      span.classList.add("tooltiptext");
      span.innerText = tooltip;
      alertDiv.classList.add("tooltip");
      alertDiv.append(span);
    }


    alertDiv.append(button);
    alertDiv.append(icon);
    alertDiv.append(document.createElement("span").innerText = text)
    formField.append(alertDiv);


    button.addEventListener("click", e => {
      button.parentElement.remove();
      e.preventDefault();
    });
    this.renderer.appendChild(document.getElementById("errorsWrapper"), formField);


  }


}
