import { AppBar } from "./app-bar/bar.js";
import { DarkLightSwitch } from "./elements/darkLightSwitch.js";
import { AppBody } from "./page-body/body.js";

function testWebsite() {
  // create pages
  const mainPage = AppBody.createBody();
  const docPage = AppBody.createBody();
  const pytalDocPage = AppBody.createBody();

  const logo = new Image();
  logo.src = 'favicon.svg';
  logo.classList.add('clickable')
  logo.onclick = (e)=>{AppBody.setCurrent(mainPage)};

  AppBar.TOP.appendElement(logo);

  AppBar.TOP.addText('SimpleFw Docs', ()=>{AppBody.setCurrent(docPage)});
  AppBar.TOP.addText('Pytal2 Docs', ()=>{AppBody.setCurrent(pytalDocPage)});

  AppBar.TOP.visible = true;

  const dlSwitch = DarkLightSwitch.getSwitch();
  dlSwitch.classList.add('force-lower-right');
  document.body.appendChild(dlSwitch);

  // define mainpage
  AppBody.setupPage(mainPage, (p)=>{
    p.addParagraph('You stumbled uppon this testing page, didn\'t you...');
    p.addTitle('Paragraph 1');
    p.addParagraph('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque convallis a cras semper auctor neque vitae. Est pellentesque elit ullamcorper dignissim cras tincidunt. Orci ac auctor augue mauris augue neque gravida in. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Id neque aliquam vestibulum morbi. In pellentesque massa placerat duis ultricies lacus. Consequat nisl vel pretium lectus quam id leo. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Vestibulum lectus mauris ultrices eros in cursus turpis massa tincidunt. Cras pulvinar mattis nunc sed. At risus viverra adipiscing at in. Enim sit amet venenatis urna cursus eget. At varius vel pharetra vel turpis nunc eget lorem. Donec enim diam vulputate ut pharetra sit amet. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium.');
    p.addTitle('Paragraph 2');
    p.addParagraph('Vulputate eu scelerisque felis imperdiet proin fermentum leo. Porttitor leo a diam sollicitudin tempor id eu nisl. Facilisis sed odio morbi quis. Augue interdum velit euismod in pellentesque. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Ut diam quam nulla porttitor. Fermentum dui faucibus in ornare quam viverra orci. Vel fringilla est ullamcorper eget nulla facilisi. Sit amet nisl suscipit adipiscing bibendum est ultricies integer quis. Aenean et tortor at risus viverra adipiscing at in tellus. Turpis egestas maecenas pharetra convallis posuere morbi leo urna molestie. Enim sed faucibus turpis in eu mi bibendum neque egestas. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Enim eu turpis egestas pretium aenean pharetra. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Ut etiam sit amet nisl purus in mollis nunc.');
    p.addTitle('Paragraph 3');
    p.addParagraph('Lacus suspendisse faucibus interdum posuere lorem ipsum. Interdum varius sit amet mattis vulputate enim nulla aliquet. Neque gravida in fermentum et sollicitudin. Dui accumsan sit amet nulla facilisi. Eget nulla facilisi etiam dignissim. Purus in massa tempor nec feugiat nisl pretium fusce id. Amet nulla facilisi morbi tempus. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Sem integer vitae justo eget magna.');
    p.addTitle('Paragraph 4');
    p.addParagraph('Erat velit scelerisque in dictum non consectetur a erat. In mollis nunc sed id semper risus in. Est placerat in egestas erat imperdiet sed. Tortor posuere ac ut consequat. Mus mauris vitae ultricies leo integer malesuada nunc vel. Elit at imperdiet dui accumsan sit amet nulla facilisi. Fames ac turpis egestas sed tempus. Feugiat nisl pretium fusce id velit ut tortor pretium. Maecenas accumsan lacus vel facilisis volutpat est velit. Sit amet risus nullam eget felis eget.');
    p.addTitle('Paragraph 5');
    p.addParagraph('Semper viverra nam libero justo laoreet. Aliquam id diam maecenas ultricies mi eget mauris pharetra. Cursus sit amet dictum sit. Nibh venenatis cras sed felis eget. Risus viverra adipiscing at in tellus integer feugiat scelerisque. Amet luctus venenatis lectus magna fringilla urna porttitor. Sit amet aliquam id diam maecenas ultricies. Eget nullam non nisi est sit. Diam maecenas ultricies mi eget mauris. Integer vitae justo eget magna fermentum iaculis eu non diam. Vulputate sapien nec sagittis aliquam. Urna condimentum mattis pellentesque id nibh tortor id. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Dui faucibus in ornare quam viverra orci.');
    p.addParagraph('Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Dolor sit amet consectetur adipiscing elit. Molestie at elementum eu facilisis sed odio morbi quis. Ipsum dolor sit amet consectetur adipiscing. Turpis nunc eget lorem dolor sed viverra. A lacus vestibulum sed arcu non odio euismod lacinia. Est sit amet facilisis magna etiam. Habitasse platea dictumst vestibulum rhoncus. Ultrices sagittis orci a scelerisque. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Volutpat commodo sed egestas egestas fringilla phasellus.');
    p.visible = true;
    p.render();

    p.addTitle('Embeding code')
    p.addCode(document.documentElement.innerHTML, 'html');
    p.addTitle('Embeding python code')
    // note that there is no indentation in the string
    p.addCode(`# lines: Import, regular expressions 
import re
for test_string in ['555-1212', 'ILL-EGAL']:
    if re.match(r'^\\d{3}-\\d{4}$', test_string):
        print (test_string, 'is a valid US local phone number')
    else:
        print (test_string, 'rejected')

# indent your Python code to put into an email
import glob  # glob supports Unix style pathname extensions
python_files = glob.glob('*.py')
for file_name in sorted(python_files):
    print ('    ------' + file_name)

    with open(file_name) as f:
        for line in f:
            print ('    ' + line.rstrip())

    print()`, 'python');

    return p;
  });


  // define doc page
  AppBody.setupPage(docPage, (p)=>{
      p.addTitle('Overview');
      p.addParagraph('SimpleFw is meant to be a framework that I understand and that limits website to the mere texts of which the website consists, while still beeing a single side app. Its primary use lies in delivering static content. And while a serverside app would be more performant, it also would make deployment harder. A compatibility with smartphones is planed, but not ready yet.');
      p.addParagraph('As of now the framework supports adding a Top bar for navigation (AppBar) and managing different page contents (AppBody). The style is very set in place although a light mode is developed on the side but not ready yet. In case you want to use this and need a feature that this framework doesn\'t provide, just implement it yourself.');

      p.addTitle('AppBar');
      p.addParagraph('The AppBar can be put on one of the 4 sides of the screen. It is recommended to put it on the top as this is most common and users therefore are more likely to understand it. The AppBar needs to be imported like shown in the following:');
      p.addCode('import { AppBar } from "./app-bar/bar.js";', 'js');
      p.addParagraph('While manual creation is possible, it is recomended, to acces one of the prebuild bars.')
      p.addCode(`AppBar.TOP.visible = true;
AppBar.LEFT.visible = true;
...`, 'js');
      p.addParagraph('As shown above the AppBar needs to be set to visible to work properly. However, for performance reasons it is recomended to first setup the bar before setting it to visible as every change to the visible bar forces a full update.');
      p.addParagraph('Example:');
      p.addCode(`const logo = new Image();
logo.src = 'favicon.svg';
logo.classList.add('clickable')
logo.onclick = (e)=>{AppBody.setCurrent(mainPage)};

AppBar.TOP.appendElement(logo);

AppBar.TOP.addText('SimpleFw Docs', ()=>{AppBody.setCurrent(docPage)});
AppBar.TOP.addText('Pytal2 Docs', ()=>{AppBody.setCurrent(pytalDocPage)});

AppBar.TOP.visible = true;`,'js');
      p.addParagraph('As you can see the AppBar supports adding html elements via the `appendElement` method as well as just adding text via the `addText` method. When adding elements, you need to take care of detecting clicks and adding a clickable class yourself. When using the addText method, you can just specify the function as a second optional parameter and the framework takes care of it.');

      p.addTitle('AppBody');
      p.addParagraph('The AppBody class is meant to create and manage different _AppBody objects. It needs to be imported like this:');
      p.addCode('import { AppBody } from "./page-body/body.js";', 'js');
      p.addParagraph('When creating a page the reference is returned. Although in the back it is only an upwards counting number referencing an array position, it should be stored, to avoid confusion and ensure compatability with upcomming versions.');
      p.addCode('const mainPage = AppBody.createBody();','js');
      p.addParagraph('To edit and display the body, you need to swith to it. Editing a body, that isn\'t displayed, is currently not possible.');
      p.addCode('AppBody.setCurrent(mainPage);','js');
      p.addImage('favicon.svg');
      p.addImage('https://images.pexels.com/photos/2603464/pexels-photo-2603464.jpeg');
      return p;
  });
    AppBody.setCurrent(docPage);
    AppBody.forceUpdate();
}

document.body.onload = testWebsite;