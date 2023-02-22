import { AppBar } from "./app-bar/bar.js"
import { AppBody } from "./page-body/body.js";

function init() {
  const logo = new Image();
  logo.src = 'favicon.svg';
  logo.classList.add('clickable')
  logo.onclick = (e)=>{};

  AppBar.TOP.appendElement(logo);

  AppBar.TOP.addText('SUBMENU1');
  AppBar.TOP.addText('SUBMENU2');

  AppBar.TOP.visible = true;
  AppBar.TOP.render();

  
  AppBody.MAIN.addTitle('Paragraph 1');
  AppBody.MAIN.addParagraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque convallis a cras semper auctor neque vitae. Est pellentesque elit ullamcorper dignissim cras tincidunt. Orci ac auctor augue mauris augue neque gravida in. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id neque aliquam vestibulum morbi. In pellentesque massa placerat duis ultricies lacus. Consequat nisl vel pretium lectus quam id leo. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Cras pulvinar mattis nunc sed. At risus viverra adipiscing at in. Enim sit amet venenatis urna cursus eget. At varius vel pharetra vel turpis nunc eget lorem. Donec enim diam vulputate ut pharetra sit amet. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium.');
  AppBody.MAIN.addTitle('Paragraph 2');
  AppBody.MAIN.addParagraph('Vulputate eu scelerisque felis imperdiet proin fermentum leo. Porttitor leo a diam sollicitudin tempor id eu nisl. Facilisis sed odio morbi quis. Augue interdum velit euismod in pellentesque. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Ut diam quam nulla porttitor. Fermentum dui faucibus in ornare quam viverra orci. Vel fringilla est ullamcorper eget nulla facilisi. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Aenean et tortor at risus viverra adipiscing at in tellus. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Enim sed faucibus turpis in eu mi bibendum neque egestas. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Enim eu turpis egestas pretium aenean pharetra. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Ut etiam sit amet nisl purus in mollis nunc.');
  AppBody.MAIN.addTitle('Paragraph 3');
  AppBody.MAIN.addParagraph('Lacus suspendisse faucibus interdum posuere lorem ipsum. Interdum varius sit amet mattis vulputate enim nulla aliquet. Neque gravida in fermentum et sollicitudin. Dui accumsan sit amet nulla facilisi. Eget nulla facilisi etiam dignissim. Purus in massa tempor nec feugiat nisl pretium fusce id. Amet nulla facilisi morbi tempus. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Sem integer vitae justo eget magna.');
  AppBody.MAIN.addTitle('Paragraph 4');
  AppBody.MAIN.addParagraph('Erat velit scelerisque in dictum non consectetur a erat. In mollis nunc sed id semper risus in. Est placerat in egestas erat imperdiet sed. Tortor posuere ac ut consequat. Mus mauris vitae ultricies leo integer malesuada nunc vel. Elit at imperdiet dui accumsan sit amet nulla facilisi. Fames ac turpis egestas sed tempus. Feugiat nisl pretium fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis volutpat est velit. Sit amet risus nullam eget felis eget.');
  AppBody.MAIN.addTitle('Paragraph 5');
  AppBody.MAIN.addParagraph('Semper viverra nam libero justo laoreet. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Cursus sit amet dictum sit. Nibh venenatis cras sed felis eget. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Amet luctus venenatis lectus magna fringilla urna porttitor. Sit amet aliquam id diam maecenas ultricies. Eget nullam non nisi est sit. Diam maecenas ultricies mi eget mauris. Integer vitae justo eget magna fermentum iaculis eu non diam. Vulputate sapien nec sagittis aliquam. Urna condimentum mattis pellentesque id nibh tortor id. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Dui faucibus in ornare quam viverra orci.');
  AppBody.MAIN.addTitle('Paragraph 6');
  AppBody.MAIN.addParagraph('Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Dolor sit amet consectetur adipiscing elit. Molestie at elementum eu facilisis sed odio morbi quis. Ipsum dolor sit amet consectetur adipiscing. Turpis nunc eget lorem dolor sed viverra. A lacus vestibulum sed arcu non odio euismod lacinia. Est sit amet facilisis magna etiam. Habitasse platea dictumst vestibulum rhoncus. Ultrices sagittis orci a scelerisque. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Volutpat commodo sed egestas egestas fringilla phasellus.');
  AppBody.MAIN.visible = true;
  AppBody.MAIN.render();
  
}

document.body.onload = init;