
import * as ClassicEditor from 'ckeditor5-custom-classic-editor/build/ckeditor';

export enum EditorType {
    CHAPTER, SUMMARY, FORUM_MESSAGE
}

export class CkeditorConfigUtil {

    static getCkeditorConfig(editorType: EditorType): any {
        const ckEditorConfig = ClassicEditor.defaultConfig;

        ckEditorConfig.language = 'fr';

        switch (editorType) {
            case EditorType.CHAPTER:
                ckEditorConfig.placeholder = 'Écrivez ou copiez/collez le contenu de votre chapitre ici...';
                break;
            case EditorType.SUMMARY:
                ckEditorConfig.placeholder = 'Il était une fois...';
                ckEditorConfig.toolbar = ['bold', 'italic', 'underline', '|', 'undo', 'redo'];
                break;
            case EditorType.FORUM_MESSAGE:
                ckEditorConfig.placeholder = 'Votre message';
                break;
        }

        return ckEditorConfig;
    }

}
