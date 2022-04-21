import { render as baseView } from './BaseView';

// todo make this work by reference
export function render(secretUrl: string): string {
  const view = `
    <h2>Link generated</h2>
    <p>Once this link is visited, the content will no longer be available.</p>
    <p>After the expiry time is reached, the content  will no longer be available.</p>
    <h3> Copy Url (add a copy hover button?) 
    <br/>
    <span id="url">${secretUrl}</span>
    <br />
    <br />
    <div class="middle">
    <button id="btn">
        <p id="btnText">Copy to clipboard</p>
        <div class="check-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        </div>
    </button>
    </div>

  <script>
   function copyToClipboard(element) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val($(element).text()).select();
      document.execCommand("copy");
      $temp.remove();
   }

   const btn = document.querySelector("#btn");
   const btnText = document.querySelector("#btnText");

   btn.onclick = () => {
       btnText.innerHTML = "Copied";
       btn.classList.add("active");
       copyToClipboard('#url');
   };
  </script>
  

    </h3>
  `.trim();
  return baseView(view);
}
