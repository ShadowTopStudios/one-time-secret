import { render as baseView } from './BaseView';

export function render(secretUrl: string): string {

  let view = `
  <br/>
    <h2>Secret has expired</h2>
    <p>
      <b></b>
      <br/>
      <br>This secret was placed in active memory and has either been  
      <br/>opened or the expiration timer was reached.
      <br/>
      <br/>It has been removed from active memory and no longer exists. 
      <br/>
      <br/> <b> Nothing is saved anywhere and cannot be retrieved.</b>
    </p>
    <br/>
    <br/>
    <br/>
    <div class="middle">
      <br/>   

    </div>
  `.trim();

  if (secretUrl) {
   view = `
    <br/>
    <h2>Ready to decrypt secret</h2>
    <p>
      <b>This can only be done once.</b>
      <br/>
      <br>This secret was placed in active memory and once you click Decrypt, 
      <br/>or the expiration timer is reached,
      <br/>it is removed from active memory and no longer exists. 
      <br/>
      <br/> <b> Nothing is saved anywhere and cannot be retrieved.</b>
    </p>
    <br/>
    <br/>
    <br/>
    <div class="middle">
      <br/>   
      <button id="btn">
        <p id="btnText">Decrypt</p>
        <div class="check-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
        </div>
      </button>
    </div>

    <script type="text/javascript">
      const btn = document.querySelector("#btn");
      const btnText = document.querySelector("#btnText");

      btn.onclick = () => {
          btnText.innerHTML = "decrypting";
          btn.classList.add("active");
          setTimeout(() => {
            window.location.href = "${secretUrl}";
          }, 1000);
      };
    </script>
  `.trim();
  }
  return baseView(view);
}
