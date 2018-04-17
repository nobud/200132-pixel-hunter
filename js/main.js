import {ScreenController} from './game/screen-controller';
import {tasks} from './data/data';

const screenController = new ScreenController(tasks);
screenController.showStartScreen();
