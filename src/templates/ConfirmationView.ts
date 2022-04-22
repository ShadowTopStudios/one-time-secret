import { render as baseView } from './BaseView';

export function render(secretUrl: string, qrCode: string): string {
  const view = `
    <br/>
    <h2>Link generated</h2>
    <p>
      <b>This is a single use link. </b>
      <br/>
      <br>The content is placed in active memory and once the link is opened, 
      <br/>or the expiration timer is reached,
      <br/>it is removed from active memory and no longer exists. 
      <br/>
      <br/> <b> Nothing is saved anywhere and cannot be retrieved.</b>
    </p>
    <br/>
    <br/>
    <br/>
    <div class="middle">
      <img src="${qrCode}" alt="qr code" width="200" height="200" />
      <h2><span id="url">${secretUrl}</span></h2>
      <br/>   
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
  `.trim();
  return baseView(view);
}
