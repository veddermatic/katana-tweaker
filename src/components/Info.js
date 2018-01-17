import React from 'react';
import './Info.css';

const Info = () => (
<div className="Info Liveset__detail">
    <h1 className="Info__heading">What is this thing?</h1>
    <p className="Info__content">
    Use it to switch amps on patches in a liveset, specifially the sneaky amps. Basically, if you have a patch you like, but wonder what it would sound like with different amps and bright settings. You cannot edit effects or gain or anything other than the amp model, bright setting, and patch name.
    </p>
    <h2 className="Info__subheading">How do I use it?</h2>
    <p className="Info__content">
    Drag a .tsl file you have exported from <strong>Katna Tone Studio</strong> or downloaded into the green block to the left that says <strong>"Drag a Liveset .tsl file here"</strong> to load it. All the patches will be shown on the left side, and clicking on the name of a patch will allow you to edit it. Clicking 'SAVE' will update the patch with your changes. 
    </p>
    <p className="Info__content">
    If you want to <em>copy</em> a patch to test out different amps, click the little '+' button to the right of the patch name and it will clone that patch and automatically select it. The app throws a couple exlamation points in front of the name of the new patch to remind you to change it.
    </p>
    <p className="Info__content">
        When you are all done, click the 'save .tsl file' and the data will be saved out for you (generally to your downloads folder). You can then load that file into <strong>Katana Tone Studio</strong> and use your patches in your amp!
    </p>
    <p className="Info__content">
    For information on exporting / importing .tsl files from Katana Tone Studio, <a href="http://www.bossus.com/blog/2016/12/29/boss-tone-studio-editor-katana-amp/" target="_boss">visit the Tone Studio page</a> and follow the links to get the manual.
    </p>
</div>
);
export default  Info;
