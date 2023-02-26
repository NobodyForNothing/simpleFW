import { AppBar } from "./app-bar/bar.js";
import { AppBody } from "./page-body/body.js";

function testWebsite() {
  // create pages
  const mainPage = AppBody.createBody();
  const docPage = AppBody.createBody();
  const pytalDocPage = AppBody.createBody();


  // TODO: fix light theme for code blocks
  const logo = new Image();
  logo.src = 'favicon.svg';
  logo.classList.add('clickable')
  logo.onclick = (e)=>{AppBody.setCurrent(mainPage)};

  AppBar.TOP.appendElement(logo);

  AppBar.TOP.addText('SimpleFw Docs', ()=>{AppBody.setCurrent(docPage)});
  AppBar.TOP.addText('Pytal2 Docs', ()=>{AppBody.setCurrent(pytalDocPage)});

  AppBar.TOP.visible = true;

  // define mainpage
  AppBody.setCurrent(mainPage);
  AppBody.MAIN.addParagraph('You stumbled uppon this testing page, didn\'t you...');
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
  AppBody.MAIN.addParagraph('Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Dolor sit amet consectetur adipiscing elit. Molestie at elementum eu facilisis sed odio morbi quis. Ipsum dolor sit amet consectetur adipiscing. Turpis nunc eget lorem dolor sed viverra. A lacus vestibulum sed arcu non odio euismod lacinia. Est sit amet facilisis magna etiam. Habitasse platea dictumst vestibulum rhoncus. Ultrices sagittis orci a scelerisque. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Volutpat commodo sed egestas egestas fringilla phasellus.');
  AppBody.MAIN.visible = true;
  AppBody.MAIN.render();

  AppBody.MAIN.addTitle('Embeding code')
  AppBody.MAIN.addCode(document.documentElement.innerHTML, 'html');
  AppBody.MAIN.addTitle('Embeding python code')
  // note that there is no indentation in the string
  AppBody.MAIN.addCode(`# lines: Import, regular expressions 
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



    // define doc page
    AppBody.setCurrent(docPage);
    AppBody.MAIN.addTitle('Overview');
    AppBody.MAIN.addParagraph('SimpleFw is meant to be a framework that I understand and that limits website to the mere texts of which the website consists, while still beeing a single side app. Its primary use lies in delivering static content. And while a serverside app would be more performant, it also would make deployment harder. A compatibility with smartphones is planed, but not ready yet.');
    AppBody.MAIN.addParagraph('As of now the framework supports adding a Top bar for navigation (AppBar) and managing different page contents (AppBody). The style is very set in place although a light mode is developed on the side but not ready yet. In case you want to use this and need a feature that this framework doesn\'t provide, just implement it yourself.');

    AppBody.MAIN.addTitle('AppBar');
    AppBody.MAIN.addParagraph('The AppBar can be put on one of the 4 sides of the screen. It is recommended to put it on the top as this is most common and users therefore are more likely to understand it. The AppBar needs to be imported like shown in the following:');
    AppBody.MAIN.addCode('import { AppBar } from "./app-bar/bar.js";', 'js');
    AppBody.MAIN.addParagraph('While manual creation is possible, it is recomended, to acces one of the prebuild bars.')
    AppBody.MAIN.addCode(`AppBar.TOP.visible = true;
AppBar.LEFT.visible = true;
...`, 'js');
    AppBody.MAIN.addParagraph('As shown above the AppBar needs to be set to visible to work properly. However, for performance reasons it is recomended to first setup the bar before setting it to visible as every change to the visible bar forces a full update.');
    AppBody.MAIN.addParagraph('Example:');
    AppBody.MAIN.addCode(`const logo = new Image();
logo.src = 'favicon.svg';
logo.classList.add('clickable')
logo.onclick = (e)=>{AppBody.setCurrent(mainPage)};

AppBar.TOP.appendElement(logo);

AppBar.TOP.addText('SimpleFw Docs', ()=>{AppBody.setCurrent(docPage)});
AppBar.TOP.addText('Pytal2 Docs', ()=>{AppBody.setCurrent(pytalDocPage)});

AppBar.TOP.visible = true;`,'js');
    AppBody.MAIN.addParagraph('As you can see the AppBar supports adding html elements via the `appendElement` method as well as just adding text via the `addText` method. When adding elements, you need to take care of detecting clicks and adding a clickable class yourself. When using the addText method, you can just specify the function as a second optional parameter and the framework takes care of it.');

    AppBody.MAIN.addTitle('AppBody');
    AppBody.MAIN.addParagraph('The AppBody class is meant to create and manage different _AppBody objects. It needs to be imported like this:');
    AppBody.MAIN.addCode('import { AppBody } from "./page-body/body.js";', 'js');
    AppBody.MAIN.addParagraph('When creating a page the reference is returned. Although in the back it is only an upwards counting number referencing an array position, it should be stored, to avoid confusion and ensure compatability with upcomming versions.');
    AppBody.MAIN.addCode('const mainPage = AppBody.createBody();','js');
    AppBody.MAIN.addParagraph('To edit and display the body, you need to swith to it. Editing a body, that isn\'t displayed, is currently not possible.');
    AppBody.MAIN.addCode('AppBody.setCurrent(mainPage);','js');



  
}

document.body.onload = testWebsite;