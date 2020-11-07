import * as CustomEditor from 'src/ckeditor-custom-builds/ckeditor5-build-custom-editor/build/ckeditor';


export enum EditorType {
    CHAPTER, SUMMARY, FORUM_MESSAGE
}

export class CkeditorConfigUtil {

    static getCkeditorConfig(editorType: EditorType): any {
        const ckEditorConfig = CustomEditor.defaultConfig;

        switch (editorType) {
            case EditorType.CHAPTER:
                ckEditorConfig.placeholder = 'Écrivez ou copiez/collez le contenu de votre chapitre ici...';
                break;
            case EditorType.SUMMARY:
                ckEditorConfig.placeholder = 'Il était une fois...';
                ckEditorConfig.language = 'fr';
                ckEditorConfig.toolbar = ['bold', 'italic', 'underline', '|', 'undo', 'redo'];
                break;
            case EditorType.FORUM_MESSAGE:
                ckEditorConfig.placeholder = 'Votre message';
                break;
        }

        return ckEditorConfig;
    }

}
